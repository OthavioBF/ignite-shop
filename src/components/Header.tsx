import Image from "next/image";
import Logo from "../assets/Logo.svg";
import { CartContext } from "@/contexts/cartContext";
import { CartButton, CartCount, Header } from "@/styles/components/header";
import { Handbag } from "phosphor-react";
import { useContext } from "react";

export function HeaderComponent() {
  const { cartProducts, handleOpenCartModal } = useContext(CartContext);

  return (
    <Header>
      <Image src={Logo} alt="" />

      <CartButton onClick={handleOpenCartModal}>
        {cartProducts?.length > 0 && (
          <CartCount>
            <span>{cartProducts.length}</span>
          </CartCount>
        )}
        <Handbag size={24} weight="bold" color="#8D8D99" />
      </CartButton>
    </Header>
  );
}
