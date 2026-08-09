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
    <div className="home__wrapper">
      <section className="home__hero">
        <div>
          <p className="home__eyebrow">Shop the latest</p>
          <h1 className="home__title">Products</h1>
          <p className="home__subtitle">
            Здесь отображаются все доступные товары. Используйте поиск, чтобы быстро найти нужный продукт.
          </p>
          <p className="home__count">
            Найдено {filteredProducts.length} из {products.length} товаров
          </p>
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <p className="home__empty">
          Товары не найдены. Попробуйте изменить запрос или очистить поиск.
        </p>
      ) : (
        <ul className="home__product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
