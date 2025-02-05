import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { CartContext } from "../Context/CardContext";
import Add from "./Add"; 
import Save from "./Save";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const apiUrl =
      "https://gist.githubusercontent.com/ChrisNjubi/1d3c5ac9974b8cac73d48a756d3b7a42/raw/0db36c0ed658d91140714c459e7a5c0570d9e537/gistfile1.txt";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const productDetail = data.find((item) => item.id.toString() === id);
        setProduct(productDetail);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const remainingProducts = products.filter((item) => item.id.toString() !== id);
  const quantity = cart[product.id]?.count || 0;
 

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="mt-6 my-5">
          <button
            onClick={() => navigate(-1)}
            className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-500"
          >
            Back to Products
          </button>
        </div>

        <div className="flex flex-col md:flex-row border-b-2 border-dotted pb-5">
          <div className="md:w-1/2 p-4 border-2 rounded-lg">
            <img
              src={product.photo_url}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="flex flex-col md:w-1/2 px-4">
            <div className="text-gray-300">fresho!</div>
            <h1 className="text-2xl font-semibold mb-4">fresho! {product.name} (Loose), 1 kg</h1>
            <p className="text-sm font-medium mb-4">{product.description}</p>
            <p className="text-xl font-semibold">
              Price: ₹{parseFloat(product.price).toFixed(2)}{" "}
              <span className="text-gray-300 text-[16px]">({parseFloat(product.price).toFixed(2)}/kg)</span>
            </p>
            <p> You Save:15% OFF</p>
            <p className="text-gray-400">(inclusive of all taxes)</p>
            <div className="flex justify-center items-center border border-black my-4 bg-gradient-to-r from-white to-red-500 text-red-900 rounded-sm">
              Har din Sasta!
            </div>

            <div className="flex items-center mt-4 justify-between">
              <div>
              <Add item={product} addToCart={addToCart} removeFromCart={removeFromCart} quantity={quantity} />
              </div>
              <div className="flex items-center px-2">
                <button className="border border-black flex items-center px-2 py-1.5 gap-2 rounded-md">
                 
                <Save border={false} />

                 
                  <div className="text-lg font-semibold">Save For later</div>
                </button>
              </div>
            </div>

            <div className="text-gray-400 py-4 flex gap-2">
              <div>
                <img src="/images/delivery-bike.png" alt="" className="w-6" />
              </div>
              <div>Earliest:Get in 10 mins</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col container py-8">
          <h2 className="text-xl font-semibold py-3">fresho! {product.name} (Loose)</h2>
          <div className="border border-black p-5 rounded-md">
            <div className="text-lg font-semibold">About the Product</div>
            <div className="py-2 pb-6 border-b">
              A popular sweet-tasting root vegetable, carrots are narrow and cone-shaped. They have thick, fleshy, deeply coloured roots which grow underground and feathery green leaves that emerge above the ground. While these greens are fresh-tasting and slightly bitter, the carrot roots are crunchy textured with a sweet and minty aromatic taste. Fresho! brings you the flavour and richness of the finest crispy and juicy carrots that are locally grown and the best of the region.
            </div>
            <div className="font-semibold py-3">Other Product Info</div>
            <div>EAN Code: {product.id}</div>
          </div>
        </div>

        <div className="flex flex-col container py-8">
          <h2 className="text-xl font-semibold py-3">Rating and Reviews</h2>
          <div className="flex flex-col border border-black p-5 rounded-md">
            <div className="py-2 flex justify-center items-center">
              <div>
                <img src="/images/feedback.png" alt="" className="w-20" />
              </div>
            </div>
            <div className="text-center text-gray-400 py-3">Want to rate this product?</div>
            <div className="text-center">You can rate or review this product only after purchasing from bigbasket</div>
          </div>
        </div>

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
