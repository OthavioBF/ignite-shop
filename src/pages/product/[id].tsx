import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  Container,
  ImageContainer,
  ProductDetails,
} from "@/styles/pages/product";
import axios from "axios";
import { HeaderComponent } from "@/components/Header";
import { CartModal } from "@/components/CartModal";
import { useContext } from "react";
import { CartContext } from "@/contexts/cartContext";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    images: Array<any>;
    price: string;
    quantity: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { handleAddToCart } = useContext(CartContext);

  return (
    <>
      <HeaderComponent />

      <CartModal />

      <Container>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>

          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={(e: any) => handleAddToCart(e, product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_OYLrzug0OoFqKk" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}: any) => {
  const productId = params.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 horas
  };
};
