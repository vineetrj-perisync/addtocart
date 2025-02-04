import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import Navbar from "./Navbar";
import { CartContext } from "./CardContext"; // Assuming CartContext is used

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false); // Track if product is added to cart
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { addToCart } = useContext(CartContext); // Using the CartContext to add products to the cart

  // Fetch all products to display remaining products
  useEffect(() => {
    const apiUrl =
      "https://gist.githubusercontent.com/ChrisNjubi/1d3c5ac9974b8cac73d48a756d3b7a42/raw/0db36c0ed658d91140714c459e7a5c0570d9e537/gistfile1.txt";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set all products
        const productDetail = data.find((item) => item.id.toString() === id); // Find the selected product
        setProduct(productDetail); // Set the selected product
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  // Filter out the selected product to show the remaining products
  const remainingProducts = products.filter((item) => item.id.toString() !== id);

  // Handle Add to Cart action
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000); // Hide the message after 3 seconds
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Product Detail */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 border-2 rounded-lg">
            <img
              src={product.photo_url}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-1/2 p-4">
            <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
            <p className="text-sm font-medium mb-4">
              {product.description}
              {product.name} are an important part of a healthy eating pattern and are excellent sources of many nutrients, including potassium, fiber, folate (folic acid), and vitamins A, E, and C. These nutrients are vital for overall health and maintenance of body systems:
             <br/>
              
              Potassium: This nutrient may help to maintain healthy blood pressure. A few sources of potassium include sweet potatoes, white potatoes, tomato products, and spinach.
              
              Fiber: Fiber regulates bowel function, helps reduce blood cholesterol levels, and may lower the risk of heart disease.
              
              Folate (folic acid): The body uses folate to form healthy red blood cells. Women of childbearing age who may become pregnant and those in the first trimester of pregnancy need adequate folate to reduce the risk of neural tube defects such as spina bifida during fetal development.
            </p>
            <p className="text-xl font-semibold">₹{parseFloat(product.price).toFixed(2)}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-700"
            >
              Add to Cart
            </button>

            {/* Display message when product is added to the cart */}
            {addedToCart && (
              <p className="mt-2 text-green-500 font-semibold">An Item is added to your basket successfully</p>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>

        {/* Remaining Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {remainingProducts.map((card) => (
              <div
                key={card.id}
                className="border rounded-lg p-4 shadow-lg bg-white flex flex-col"
              >
                <div className="h-[250px] border-2 p-2 bg-slate-100 mb-10">
                  <Link to={`/product/${card.id}`}>
                    <img
                      src={card.photo_url}
                      alt={card.name}
                      className="h-[230px] w-full object-cover"
                    />
                  </Link>
                </div>
                <h2 className="text-lg font-semibold mb-2">{card.name}</h2>
                <p className="text-lg font-semibold">₹{parseFloat(card.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
