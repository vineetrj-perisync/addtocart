import React, { useContext } from 'react';
import { CartContext } from '../Context/CardContext';

function Add({ item }) {  
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  
  const count = cart[item.id]?.count || 0;

  return (
    <div className="flex items-center justify-center ">
      <button
        className="px-5 py-1.5 bg-red-700 text-white rounded"
        onClick={() => decrementQuantity(item.id)}
        disabled={count <= 0} 
      >
        -
      </button>
      <span className="mx-3 font-semibold text-black">{count}</span> 
      <button
        className="px-5 py-1.5 bg-red-700 text-white rounded"
        onClick={() => incrementQuantity(item)}
      >
        +
      </button>
    </div>
  );
}

export default Add;
