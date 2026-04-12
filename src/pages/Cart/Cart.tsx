import { useCart } from "../../hooks/useCart";
import './index.css'

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  if (cart.length === 0) return <p>Cart is empty</p>;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div>
        <h1>Cart</h1>
        {cart.map((item) => (
          <div key={item.id} className="cart__item">
            <h3>{item.title}</h3>
            <p>Price: {item.price}$</p>

            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>

            <button onClick={() => removeFromCart(item.id)}>
              Удалить товар
            </button>
          </div>
        ))}
      </div>
      <h2>Total price: {totalPrice}$</h2>
    </>
  );
};

export default Cart;
