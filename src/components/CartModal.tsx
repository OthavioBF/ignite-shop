import { CartContext } from "@/contexts/cartContext";
import {
  CartItem,
  Container,
  ImageContainer,
  ItemsContainer,
  PriceSection,
  ScrollView,
} from "@/styles/components/cart";
import axios from "axios";
import Image from "next/image";
import { Minus, Plus, Trash, X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";

export function CartModal() {
  const {
    openCartModal,
    cartProducts,
    totalItemsCart,
    totalToPay,
    handleAddToCart,
    handleDecrementItemCart,
    handleRemoveFromCart,
    handleOpenCartModal,
  } = useContext(CartContext);

  async function handleBuyProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        products: cartProducts,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Falha ao redirecionar para checkout!");
    }
  }

  return (
    <Container open={openCartModal}>
      <ItemsContainer>
        <button onClick={handleOpenCartModal}>
          <X size={24} color="#FFFFFF" />
        </button>
        <h1>Sacola de compras</h1>
        <ScrollView>
          {cartProducts.map((cartProduct) => (
            <CartItem key={cartProduct.id}>
              <ImageContainer>
                <Image
                  src={cartProduct.imageUrl}
                  width={95}
                  height={95}
                  alt=""
                />
              </ImageContainer>

              <div>
                <strong>{cartProduct.name}</strong>

                <span>{cartProduct.price}</span>

                <div>
                  {cartProduct.quantity === 1 ? (
                    <button
                      onClick={() => handleRemoveFromCart(cartProduct.id)}
                    >
                      <Trash size={24} color="#00875f" weight="bold" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDecrementItemCart(cartProduct.id)}
                    >
                      <Minus size={24} color="#00875f" weight="bold" />
                    </button>
                  )}
                  <div>{cartProduct.quantity}</div>

                  <button onClick={(e: any) => handleAddToCart(e, cartProduct)}>
                    <Plus size={24} color="#00875f" weight="bold" />
                  </button>
                </div>
              </div>
            </CartItem>
          ))}
        </ScrollView>
      </ItemsContainer>

      <PriceSection>
        <div>
          <div>
            <p>Quantidade</p>
            <span>{totalItemsCart} itens</span>
          </div>
          <div>
            <strong>Valor total</strong>
            <strong>{totalToPay}</strong>
          </div>
        </div>

        <button onClick={handleBuyProduct}>Finalizar compra</button>
      </PriceSection>
    </Container>
  );
}
