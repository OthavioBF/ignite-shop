import { GetServerSideProps } from "next";
import Image from "next/image";
import { stripe } from "@/lib/stripe";
import {
  Container,
  ImageContainer,
  ImagesContainer,
} from "@/styles/pages/success";
import Link from "next/link";
import Stripe from "stripe";
import Head from "next/head";
import Logo from "../../assets/Logo.svg";
import { Product } from "@/contexts/cartContext";

interface SuccessProps {
  clientName: string;
  product: {
    id: string;
    imageUrl: string;
    quantity: number;
    description: string;
  }[];
}

export default function Success({ clientName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <Image src={Logo} alt="" />
        <ImagesContainer>
          {product.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Compra Efetuada</h1>

        {product.length > 1 ? (
          <p>
            Uhuul <strong>{clientName}</strong>, suas{" "}
            <strong>{product.length} camisetas</strong> já estão a caminho da
            sua casa.{" "}
          </p>
        ) : (
          <p>
            Uhuul <strong>{clientName}</strong>, sua{" "}
            <strong>{product[0].description}</strong> já está a caminho da sua
            casa.{" "}
          </p>
        )}

        <Link href="/">Voltar ao catalogo</Link>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const clientName = session.customer_details?.name;

  const product = session.line_items?.data.map((item) => {
    const productImage = item.price?.product as Stripe.Product;
    return {
      id: item.id,
      imageUrl: productImage.images[0],
      quantity: item.quantity,
      description: item.description,
    };
  });

  return {
    props: {
      clientName,
      product,
    },
  };
};
