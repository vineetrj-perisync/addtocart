import React, { useContext } from "react";
import { CartContext } from "./CardContext";
import Navbar from "./Navbar";

function AddCart() {
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);


  const calculateSubtotal = (item) => {
    return parseFloat(item.price) * (item.count || 1);
  };


  const calculateTotal = () =>
    Object.values(cart).reduce((total, item) => total + calculateSubtotal(item), 0);

  const deliveryCharge = 30;

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-10 px-4">
        <div className="flex py-2">
          <button
            className=" bg-red-700 text-white px-4 py-2 rounded "
            onClick={() => window.history.back()}
          >
            Continue Shopping
          </button>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-6">
          <h1 className="text-2xl font-bold">Your Basket</h1>
          {Object.keys(cart).length === 0 && (
            <p className="text-gray-600 mt-4">Your basket is empty!</p>
          )}
        </div>

        {Object.keys(cart).length > 0 && (
          <div className="bg-white shadow-md rounded p-4 mb-6">
            <h2 className="text-xl font-semibold mb-3">Items Details</h2>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-200 font-semibold text-lg">
              <p className="w-1/4">Item</p>
              <p className="w-1/4 text-center">Quantity</p>
              <p className="w-1/4 text-right">Subtotal</p>
            </div>

            {Object.values(cart).map((item) => {
              const subtotal = calculateSubtotal(item).toFixed(2);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border p-4 mb-2 bg-white shadow-md rounded  "
                >
                  <div className=" md:flex items-center gap-4 w-1/4 fle-col">
                    <img
                      src={item.photo_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-black">{item.name}</p>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-1/4">
                    <button
                      className="px-3 py-1 bg-red-700 text-white rounded"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-3 font-semibold">{item.count}</span>
                    <button
                      className="px-3 py-1 bg-red-700 text-white rounded"
                      onClick={() => incrementQuantity(item)}
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold w-1/4 text-right">₹{subtotal}</p>
                </div>
              );
            })}
          </div>
        )}

        {Object.keys(cart).length > 0 && (
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-3">Billing Details</h2>
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mt-2">
              <span>Delivery Charges:</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <span>Total:</span>
              <span>₹{(calculateTotal() + deliveryCharge).toFixed(2)}</span>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 bg-green-600 text-white rounded"

              >
                Checkout
              </button>
            </div>
          </div>
        )}


      </div>
    </>
  );
}

export default AddCart;

