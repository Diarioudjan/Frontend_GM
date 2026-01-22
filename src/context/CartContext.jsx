import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Charger le panier au démarrage
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const cart = await cartService.getCart();
        setCartItems(cart);
        updateCartTotals(cart);
      } catch (error) {
        console.error("Failed to load cart", error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // Calculer les totaux basés sur les items actuels
  const updateCartTotals = (items) => {
    if (!items) return;
    const total = cartService.getCartTotal(items);
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartTotal(total);
    setItemCount(count);
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const updatedCart = await cartService.addToCart(product, quantity);
      if (updatedCart) {
        setCartItems(updatedCart);
        updateCartTotals(updatedCart);
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await cartService.updateQuantity(productId, quantity);
      if (updatedCart) {
        setCartItems(updatedCart);
        updateCartTotals(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      if (updatedCart) {
        setCartItems(updatedCart);
        updateCartTotals(updatedCart);
      }
    } catch (error) {
      console.error("Error removing from cart", error);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCartItems([]);
      updateCartTotals([]);
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  const isInCart = (productId) => {
    // Adapter selon la structure de l'objet item (item.product._id ou item.id ?)
    // Le backend renvoie items: [{ product: { _id, ... }, quantity, ... }]
    // Donc on cherche dans item.product._id
    return cartItems.some(item => {
      const id = item.product ? (item.product._id || item.product.id) : item.id;
      return id === productId;
    });
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => {
      const id = item.product ? (item.product._id || item.product.id) : item.id;
      return id === productId;
    });
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    cartTotal,
    itemCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 