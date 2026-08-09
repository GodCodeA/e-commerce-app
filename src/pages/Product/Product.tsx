import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsById } from "../../api/products";
import { useCart } from "../../hooks/useCart";
import type { ProductProps } from "../../types/Types";
import "./index.css";

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

  if (loading) return <p className="product__status">Загрузка...</p>;

  if (error)
    return (
      <div className="product__status-block">
        <p className="product__status">Товар не найден.</p>
        <button className="product__action-btn" onClick={() => navigate("/")}>
          На главную
        </button>
      </div>
    );

  if (!product) return null;

  return (
    <section className="product__page">
      <div className="product__header">
        <button className="product__back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      <div className="product__container">
        <div className="product__image-card">
          <img
            className="product__image"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product__details">
          <h1 className="product__title">{product.title}</h1>
          <p className="product__price">{product.price}$</p>
          <p className="product__description">{product.description}</p>

          <button
            className="product__action-btn"
            onClick={() => addToCart(product)}
            disabled={loading || error}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
