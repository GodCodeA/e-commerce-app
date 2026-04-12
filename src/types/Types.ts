export type ProductProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
};

export type CartItem = ProductProps & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductProps) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void
};

export type ProductCardProps = {
  product: ProductProps;
};
