import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./index.css";
import type { ProductProps } from "../../types/Types";
import Loader from "../../components/Loader/loader";

type HomeProps = {
  searchQuery: string;
};

const Home = ({ searchQuery }: HomeProps) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [products, searchQuery],
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="home">
      {loading ? (
        <div className="home__loader-wrapper">
          <Loader />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="home__empty">
          No products found. Try changing the query or clearing the search.
        </p>
      ) : (
        <>
          <div className="home__hero">
            <div className="home__wrapper">
              <p className="home__eyebrow">Shop the latest</p>
              <h1 className="home__title">Products</h1>
              <p className="home__subtitle">
                All available products are displayed here. Use the search to
                quickly find the item you need.
              </p>
            </div>
          </div>
          <div className="home__product-horizontal-border"></div>
          <ul className="home__product-list">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
          <div className="home__product-horizontal-border"></div>
        </>
      )}
    </section>
  );
};

export default Home;
