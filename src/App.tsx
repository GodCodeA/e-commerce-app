import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import SearchForm from "./components/SearchForm/SearchForm";
import HeaderActions from "./components/HeaderActions/HeaderActions";
import "./App.css";
import { useCart } from "./hooks/useCart";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [searchQuery, setSearchQuery] = useState("");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <nav className="nav">
              <Link to="/" className="home-link">Home</Link>
              <Link to="/cart" className="cart-link">
                <ShoppingCart />
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </Link>
            </nav>

            <SearchForm onSearch={setSearchQuery} />
            <HeaderActions toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>
      <div className="container">
        <main>
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </main>
      </div>
      <footer>
        <div className="container"></div>
      </footer>
    </div>
  );
}

export default App;
