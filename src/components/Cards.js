import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "./CardContext";
import { Link } from "react-router-dom";
import Add from "./Add"; // ✅ Import the Add component
import Save from "./Save";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4);
  const { cart, addToCart } = useContext(CartContext);

  const apiUrl =
    "https://gist.githubusercontent.com/ChrisNjubi/1d3c5ac9974b8cac73d48a756d3b7a42/raw/0db36c0ed658d91140714c459e7a5c0570d9e537/gistfile1.txt";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const loadMoreCards = () => {
    setVisibleCards(cards.length);
  };

  return (
    <div className="container bg-gray-100 mt-9">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-2xl font-semibold">My Smart Basket</h2>
        {visibleCards < cards.length && (
          <div className="flex justify-center mt-4">
            <button
              className="text-black px-6 py-2 rounded underline font-semibold"
              onClick={loadMoreCards}
            >
              View All
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {cards.slice(0, visibleCards).map((card) => {
          const originalPrice = parseFloat(card.price).toFixed(2);
          const discountedPrice = (originalPrice * 1.1).toFixed(2);
          const count = cart[card.id]?.count || 0;

          return (
            <div key={card.id} className="border rounded-lg p-4 shadow-lg bg-white flex flex-col">
              <div className="h-[250px] border-2 p-2 bg-slate-100 mb-10">
                <Link to={`/product/${card.id}`}>
                  <img
                    src={card.photo_url}
                    alt={card.name}
                    className="h-[230px] w-full object-cover"
                  />
                </Link>
              </div>
              <h2 className="text-gray-400">fresho!</h2>
              <h2 className="text-lg font-semibold mb-2">{card.name}</h2>

              <p className="text-lg font-semibold">
                ₹{originalPrice} <strike className="text-[13px] text-gray-300">₹{discountedPrice}</strike>
              </p>

              <div className="flex items-center gap-4 mt-10 ">
              <Save border={true} />

                {count > 0 ? (
                  
                  <Add item={card} />
                ) : (
                  <button
                    className="p-2 hover:bg-red-700 w-[150px] hover:text-white border border-black rounded-sm font-semibold"
                    onClick={() => addToCart(card)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
