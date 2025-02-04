import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // Add item to cart or update the count if it already exists
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

  // Increment the quantity of an existing item in the cart
  const incrementQuantity = (item) => {
    setCart((prevCart) => {
      // Make sure the item exists before incrementing
      const existingItem = prevCart[item.id];
      if (!existingItem) return prevCart; // Avoid modifying if the item doesn't exist

      return {
        ...prevCart,
        [item.id]: { ...existingItem, count: existingItem.count + 1 },
      };
    });
  };

  // Decrement the quantity of an existing item in the cart
  const decrementQuantity = (id) => {
    setCart((prevCart) => {
      const item = prevCart[id];
      if (!item) return prevCart; // Avoid modifying if the item doesn't exist

      // If count is 1, remove the item from the cart
      if (item.count === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[id];
        return updatedCart;
      }

      // Decrease the count of the item if it's more than 1
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
