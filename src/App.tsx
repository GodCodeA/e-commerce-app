import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
