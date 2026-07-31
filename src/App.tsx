import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useRef, type FormEvent } from "react";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import "./App.css";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerActionsRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchQuery(inputValue.trim());
    console.log("search submit:", inputValue.trim());
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchQuery("");
    inputRef.current?.focus();
  };

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

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      setSearchQuery(inputValue.trim());
    }, 500);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [inputValue]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        if (document.activeElement === inputRef.current && inputValue !== "") {
          clearSearch();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inputValue]);

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <form
          className="search-form"
          onSubmit={handleSearchSubmit}
          role="search"
          aria-label="Find the catalog"
        >
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>

            <input
              id="site-search"
              ref={inputRef}
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Find product..."
              aria-label="Search the catalog"
              className="search-input"
            />

            <button
              type="button"
              onClick={clearSearch}
              className="search-clear"
              aria-label="Clear search"
              hidden={inputValue === ""}
            >
              ✕
            </button>
          </div>

          <button type="submit" className="search-btn" aria-label="Search">
            Search
          </button>
        </form>

        <div className="header-actions" ref={headerActionsRef}>
          <button
            className="more-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            More options
          </button>

          {menuOpen && (
            <div className="more-menu">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                type="button"
                role="menuitem"
              >
                Change theme
              </button>
            </div>
          )}
        </div>
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
