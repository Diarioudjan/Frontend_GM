import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService } from '../services/api';
import { Product, CartItem } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    cartTotal: number;
    itemCount: number;
    loading: boolean;
    addToCart: (product: Product, quantity?: number) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    isInCart: (productId: string) => boolean;
    getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [itemCount, setItemCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadCart = async () => {
            try {
                setLoading(true);
                const cart = await cartService.getCart();
                setCartItems(cart as CartItem[]);
                updateCartTotals(cart as CartItem[]);
            } catch (error) {
                console.error("Failed to load cart", error);
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    const updateCartTotals = (items: CartItem[]) => {
        if (!items) return;
        const total = cartService.getCartTotal(items);
        const count = items.reduce((acc, item) => acc + item.quantity, 0);
        setCartTotal(total);
        setItemCount(count);
    };

    const addToCart = async (product: Product, quantity = 1) => {
        try {
            const updatedCart = await cartService.addToCart(product, quantity);
            if (updatedCart) {
                setCartItems(updatedCart as CartItem[]);
                updateCartTotals(updatedCart as CartItem[]);
            }
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        try {
            const updatedCart = await cartService.updateQuantity(productId, quantity);
            if (updatedCart) {
                setCartItems(updatedCart as CartItem[]);
                updateCartTotals(updatedCart as CartItem[]);
            }
        } catch (error) {
            console.error("Error updating quantity", error);
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            const updatedCart = await cartService.removeFromCart(productId);
            if (updatedCart) {
                setCartItems(updatedCart as CartItem[]);
                updateCartTotals(updatedCart as CartItem[]);
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

    const isInCart = (productId: string) => {
        return cartItems.some(item => {
            const id = item.product ? (item.product._id || item.product.id) : (item as any).id;
            return id === productId;
        });
    };

    const getItemQuantity = (productId: string) => {
        const item = cartItems.find(item => {
            const id = item.product ? (item.product._id || item.product.id) : (item as any).id;
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
