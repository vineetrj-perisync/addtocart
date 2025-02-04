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
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: { ...prevCart[item.id], count: prevCart[item.id].count + 1 },
    }));
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) => {
      if (prevCart[id].count === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[id]; // Remove the item if count becomes 0
        return updatedCart;
      }

      return {
        ...prevCart,
        [id]: { ...prevCart[id], count: prevCart[id].count - 1 },
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
