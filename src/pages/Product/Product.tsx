import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById } from "../../api/products";
import { useCart } from "../../hooks/useCart";
import type { ProductProps } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import './index.css'

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        setProduct(null);
        const data = await getProductsById(id);
        setProduct(data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>Product not found</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  if (!product) return null;
  return (
    <div className="product__page">
      <button onClick={() => navigate(-1)}>Back</button>

      <div className="product__container">
        <img src={product.thumbnail} width={200} />

        <div>
          <h1>{product.title}</h1>
          <p className="product__price">{product.price}$</p>
          <p>{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            disabled={loading || error}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
