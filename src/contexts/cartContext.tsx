import { formatPrice } from "@/utils/formatPrice";
import { ReactNode, createContext, useState, useEffect } from "react";

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
  description?: string;
  defaultPriceId?: string;
};

type CartContextDataProps = {
  cartProducts: Product[];
  openCartModal: boolean;
  totalItemsCart: number;
  totalToPay: string;
  handleAddToCart: (e: Event, product: Product) => void;
  handleDecrementItemCart: (productId: string) => void;
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
  const [totalItemsCart, setTotalItemsCart] = useState(0);
  const [totalToPay, setTotalToPay] = useState("");
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);

  console.log("products", cartProducts);

  function handleAddToCart(e: Event, product: Product) {
    e.preventDefault();

    const itemIndex = cartProducts.findIndex((p) => p.id === product.id);

    if (itemIndex === -1) {
      setCartProducts((state) => [...state, { ...product, quantity: 1 }]);
    } else {
      const products = [...cartProducts];

      products[itemIndex].quantity += 1;

      setCartProducts(products);
    }
  }

  function handleDecrementItemCart(productId: String) {
    const products = [...cartProducts];

    const itemIndex = products.findIndex((p) => p.id === productId);

    products[itemIndex].quantity -= 1;

    setCartProducts(products);
  }

  async function handleRemoveFromCart(productId: string) {
    handleDecrementItemCart(productId);

    setCartProducts((state) =>
      state.filter((product) => product.id !== productId)
    );
  }

  function handleOpenCartModal() {
    setOpenCartModal(!openCartModal);
  }

  useEffect(() => {
    const totalItems = cartProducts.reduce((acc, product) => {
      if (product.quantity >= 1) {
        return (acc += product.quantity);
      }
      return acc;
    }, 0);

    const totalPay: number = cartProducts
      .filter((product) => product.quantity >= 1)
      .map((product) => {
        if (product.quantity > 0) {
          const price = product.price.replace(/[^\d.,]/g, "").replace(",", ".");

          return product.quantity * parseFloat(price);
        } else return 0;
      })
      .reduce((total, currentValue) => total + currentValue, 0);

    setTotalItemsCart(totalItems);
    setTotalToPay(formatPrice(totalPay));
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        openCartModal,
        totalItemsCart,
        totalToPay,
        handleAddToCart,
        handleDecrementItemCart,
        handleRemoveFromCart,
        handleOpenCartModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
