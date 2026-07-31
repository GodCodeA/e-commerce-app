import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard";
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
      <h1 className="home__title">Products</h1>
      <ul className="home__product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </ul>
    </div>
  );
};

export default Home;
