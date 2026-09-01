import "./index.css";
import { Link } from "react-router-dom";
import type { ProductCardProps } from "../../types/Types";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li>
      <div className="product-card">
        <Link to={`/product/${product.id}`} className="product-card__link">
          <img src={product.thumbnail} alt={product.title} className="product-card__img"></img>
          <div className="product-card__text-wrapper">
            <h3 className="product-card__title">{product.title}</h3>
            <p className="product-card__price">{product.price}$</p>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default ProductCard;
