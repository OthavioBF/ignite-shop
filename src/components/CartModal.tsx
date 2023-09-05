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
import { X } from "phosphor-react";
import { useContext } from "react";

export function CartModal() {
  const {
    openCartModal,
    cartProducts,
    handleRemoveFromCart,
    handleOpenCartModal,
  } = useContext(CartContext);

  // async function handleBuyProduct() {
  //   try {
  //     const response = await axios.post("/api/checkout", {
  //       priceId: product.defaultPriceId,
  //     });

  //     const { checkoutUrl } = response.data;

  //     window.location.href = checkoutUrl;
  //   } catch (err) {
  //     alert("Falha ao redirecionar para checkout!");
  //   }
  // }

  function getTotalCart() {
    const totalCart = cartProducts.reduce((acc, item) => {
      const price = item.price.replace(/[^\d.,]/g, "").replace(",", ".");
      return acc + parseFloat(price);
    }, 0);

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalCart);
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

                <button onClick={() => handleRemoveFromCart(cartProduct.id)}>
                  Remover
                </button>
              </div>
            </CartItem>
          ))}
        </ScrollView>
      </ItemsContainer>

      <PriceSection>
        <div>
          <div>
            <p>Quantidade</p>
            <span>{cartProducts.length} itens</span>
          </div>
          <div>
            <strong>Valor total</strong>
            <strong>{getTotalCart()}</strong>
          </div>
        </div>

        <button>Finalizar compra</button>
      </PriceSection>
    </Container>
  );
}
