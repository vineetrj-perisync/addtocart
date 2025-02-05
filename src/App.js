import "./App.css";
import Navbar from "./components/Navbar";
import Cards from "./components/Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCart from "./components/AddCart";
import { CartProvider } from "./Context/CardContext";
import Product from "./components/ProductDetail";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Cards />
              </>
            }
          />
          <Route path="/addcart" element={<AddCart />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
