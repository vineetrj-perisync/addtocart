import React, { useContext } from 'react';
import { CartContext } from './CardContext';

function Add({ item }) {  // Accept item as a prop
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  
  const count = cart[item.id]?.count || 0; // ✅ Ensure count is retrieved correctly

  return (
    <div className="flex items-center justify-center ">
      <button
        className="px-3 py-1 bg-red-700 text-white rounded"
        onClick={() => decrementQuantity(item.id)}
        disabled={count <= 0} // ✅ Prevent negative count
      >
        -
      </button>
      <span className="mx-3 font-semibold text-black">{count}</span> {/* ✅ Ensure count updates */}
      <button
        className="px-3 py-1 bg-red-700 text-white rounded"
        onClick={() => incrementQuantity(item)}
      >
        +
      </button>
    </div>
  );
}

export default Add;
