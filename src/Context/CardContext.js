import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart[item.id];

      return {
        ...prevCart,
        [item.id]: existingItem
          ? { ...existingItem, count: existingItem.count + 1 }
          : { ...item, count: 1 },
      };
    });
  };

  
  const incrementQuantity = (item) => {
    setCart((prevCart) => {
     
      const existingItem = prevCart[item.id];
      if (!existingItem) return prevCart; 

      return {
        ...prevCart,
        [item.id]: { ...existingItem, count: existingItem.count + 1 },
      };
    });
  };

  
  const decrementQuantity = (id) => {
    setCart((prevCart) => {
      const item = prevCart[id];
      if (!item) return prevCart;


      if (item.count === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[id];
        return updatedCart;
      }

      
      return {
        ...prevCart,
        [id]: { ...item, count: item.count - 1 },
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
