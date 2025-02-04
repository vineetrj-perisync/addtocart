import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const incrementQuantity = (item) => {
    setCart((prevCart) => {
      return {
        ...prevCart,
        [item.id]: {
          ...prevCart[item.id],
          count: (prevCart[item.id]?.count || 0) + 1,
        },
      };
    });
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) => {
      if (!prevCart[id] || prevCart[id].count <= 1) {
        const newCart = { ...prevCart };
        delete newCart[id];
        return newCart;
      }
      return {
        ...prevCart,
        [id]: {
          ...prevCart[id],
          count: prevCart[id].count - 1,
        },
      };
    });
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      return {
        ...prevCart,
        [item.id]: {
          ...(prevCart[item.id] || {}),
          ...item,
          count: (prevCart[item.id]?.count || 0) + 1,
        },
      };
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[id]) {
        delete newCart[id];
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        incrementQuantity,
        decrementQuantity,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
