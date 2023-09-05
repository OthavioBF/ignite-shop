import { ReactNode, createContext, useState } from "react";

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description?: string;
  defaultPriceId?: string;
};

type CartContextDataProps = {
  cartProducts: Product[];
  openCartModal: boolean;
  handleAddToCart: (e: Event, product: Product) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleOpenCartModal: () => void;
};

type CartContextProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextDataProps>(
  {} as CartContextDataProps
);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);

  console.log("products", cartProducts);

  async function handleAddToCart(e: Event, product: Product) {
    e.preventDefault();

    setCartProducts((state) => [...state, product]);
  }

  async function handleRemoveFromCart(productId: string) {
    setCartProducts((state) =>
      state.filter((product) => product.id !== productId)
    );
  }

  function handleOpenCartModal() {
    console.log("entrei", openCartModal);
    setOpenCartModal(!openCartModal);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        openCartModal,
        handleAddToCart,
        handleRemoveFromCart,
        handleOpenCartModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
