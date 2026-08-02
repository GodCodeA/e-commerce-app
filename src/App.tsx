import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import SearchForm from "./components/SearchForm/SearchForm";
import HeaderActions from "./components/HeaderActions/HeaderActions";
import "./App.css";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <SearchForm onSearch={setSearchQuery} />
        <HeaderActions toggleTheme={toggleTheme} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
