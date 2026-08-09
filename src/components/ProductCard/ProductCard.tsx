import "./index.css";
import { Link } from "react-router-dom";
import type { ProductCardProps } from "../../types/Types";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li>
      <div className="card">
        <Link to={`/product/${product.id}`} className="card_link">
          <img src={product.thumbnail} alt={product.title} className="card__img"></img>
          <div className="card__text-wrapper">
            <h3>{product.title}</h3>
            <p>{product.price}$</p>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default ProductCard;
