import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import "./App.css";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerActionsRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        menuOpen &&
        headerActionsRef.current &&
        !headerActionsRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);
  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <div className="header-actions" ref={headerActionsRef}>
          <button
            className="more-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
          >
            More options
          </button>

          {menuOpen && (
            <div className="more-menu">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                type="button"
              >
                Change theme
              </button>
            </div>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
