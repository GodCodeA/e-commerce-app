import "./index.css";
import { Link } from "react-router-dom";
import type { ProductCardProps } from "../types/Types";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li>
      <div className="card">
        <Link to={`/product/${product.id}`} className="card_link">
          <img src={product.thumbnail} width={100}></img>
          <h3>{product.title}</h3>
          <p>{product.price}$</p>
        </Link>
      </div>
    </li>
  );
};

export default ProductCard;
