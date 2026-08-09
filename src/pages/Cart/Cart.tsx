import { useCart } from "../../hooks/useCart";
import "./index.css";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  if (cart.length === 0)
    return <p className="cart__empty">Your cart is currently empty.</p>;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <section className="cart">
      <div className="cart__wrapper">
        <h1 className="cart__title">Cart</h1>

        {cart.map((item) => (
          <div key={item.id} className="cart__item">
            <div className="cart__item-info">
              <h3>{item.title}</h3>
              <p className="cart__item-price">Price: {item.price}$</p>
            </div>

            <div className="cart__item-actions">
              <div className="cart__quantity">
                <button
                  className="cart__quantity-button"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="cart__quantity-value">{item.quantity}</span>
                <button
                  className="cart__quantity-button"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              <button
                className="cart__remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove item
              </button>
            </div>
          </div>
        ))}

        <h2 className="cart__total">Total price: {totalPrice}$</h2>
      </div>
    </section>
  );
};

export default Cart;
