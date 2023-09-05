import { globalStyles } from "@/styles/globlal";
import { Container } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import { CartContextProvider } from "@/contexts/cartContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}
