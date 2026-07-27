import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard";
import "./index.css";
import type { ProductProps } from "../../types/Types";

const Home = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <div className="home__wrapper">
      <h1 className="home__title">Products</h1>
      <ul className="home__product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
