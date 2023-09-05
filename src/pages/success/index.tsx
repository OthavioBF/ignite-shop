import { GetServerSideProps } from "next";
import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Container, ImageContainer } from "@/styles/pages/success";
import Link from "next/link";
import Stripe from "stripe";
import Head from "next/head";

interface SuccessProps {
  clientName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ clientName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <h1>Compra Efetuada</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{clientName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.{" "}
        </p>

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

  const clientName = session.costumer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      clientName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
