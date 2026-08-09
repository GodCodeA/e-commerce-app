import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./index.css";
import type { ProductProps } from "../../types/Types";

type HomeProps = {
  searchQuery: string;
};

const Home = ({ searchQuery }: HomeProps) => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [products, searchQuery],
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <section className="home">
      <div className="home__hero">
        <div>
          <p className="home__eyebrow">Shop the latest</p>
          <h1 className="home__title">Products</h1>
          <p className="home__subtitle">
            All available products are displayed here. Use the search to quickly
            find the item you need.
          </p>
          <p className="home__count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="home__empty">
          No products found. Try changing the query or clearing the search.
        </p>
      ) : (
        <ul className="home__product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Home;
