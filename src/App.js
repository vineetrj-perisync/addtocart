import "./App.css";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCart from "./components/AddCart";
import { CartProvider } from "./components/CardContext";

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
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
