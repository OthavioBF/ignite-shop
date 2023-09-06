import { styled } from "@/styles";
import { CartButton, Container, Product } from "@/styles/pages/home";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

import { stripe } from "@/lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from "phosphor-react";
import { useContext } from "react";
import { CartContext, Product as ProductProps } from "@/contexts/cartContext";
import { HeaderComponent } from "@/components/Header";
import { CartModal } from "@/components/CartModal";

interface ServerProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const { cartProducts, handleAddToCart } = useContext(CartContext);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
    mode: "free-snap",
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HeaderComponent />

      <CartModal />

      <Container ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <CartButton onClick={(e: any) => handleAddToCart(e, product)}>
                  <Handbag size={24} weight="bold" color="#ffffff" />
                </CartButton>
              </footer>
            </Product>
          </Link>
        ))}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
