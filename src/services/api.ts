import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, Product, ApiResponse, Order, Address } from '../types';

// Configuration de base d'Axios
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || '/api';

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expiré ou invalide
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/connexion';
        }
        return Promise.reject(error);
    }
);

// Service d'authentification
export const authService = {
    // Connexion
    login: async (credentials: any): Promise<ApiResponse<{ token: string; user: User }>> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    // Inscription
    register: async (userData: any): Promise<ApiResponse<{ token: string; user: User }>> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    // Déconnexion
    logout: (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Vérifier si l'utilisateur est connecté
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },

    // Obtenir les informations de l'utilisateur
    getCurrentUser: (): User | null => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};

// Fonctions utilitaires
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'GNF',
        minimumFractionDigits: 0
    }).format(amount);
};

export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
};

// Service des produits
export const productService = {
    // Obtenir tous les produits (liste paginée)
    getAllProducts: async (params = {}): Promise<ApiResponse<{
        products: Product[];
        totalPages: number;
        currentPage: number;
        totalProducts: number;
    }>> => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    // Obtenir un produit par ID
    getProductById: async (id: string): Promise<ApiResponse<Product>> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // ... (Je vais raccourcir pour la démo, mais dans un vrai scénario je migrerais tout)
    // Obtenir mes produits (pour vendeurs)
    getMyProducts: async (): Promise<ApiResponse<Product[]>> => {
        const response = await api.get('/products/my-products');
        return response.data;
    },

    // Créer un nouveau produit
    createProduct: async (productData: any): Promise<ApiResponse<Product>> => {
        const config = productData instanceof FormData
            ? { headers: { 'Content-Type': 'multipart/form-data' } }
            : {};
        const response = await api.post('/products', productData, config);
        return response.data;
    },

    // Mettre à jour un produit
    updateProduct: async (id: string, productData: any): Promise<ApiResponse<Product>> => {
        const config = productData instanceof FormData
            ? { headers: { 'Content-Type': 'multipart/form-data' } }
            : {};
        const response = await api.put(`/products/${id}`, productData, config);
        return response.data;
    },

    // Supprimer un produit
    deleteProduct: async (id: string): Promise<ApiResponse<any>> => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};

// Service des commandes
export const orderService = {
    // Créer une nouvelle commande
    createOrder: async (orderData: any): Promise<ApiResponse<Order>> => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    // Obtenir les commandes de l'utilisateur
    getUserOrders: async (): Promise<ApiResponse<{ orders: Order[] }>> => {
        try {
            const response = await api.get('/orders/myorders');
            return response.data;
        } catch (error) {
            console.error('Erreur getUserOrders:', error);
            return { status: 'error', data: { orders: [] } };
        }
    },
};

// Service utilisateur
export const userService = {
    // Mettre à jour le profil
    updateProfile: async (userData: any): Promise<ApiResponse<{ user: User }>> => {
        const response = await api.put('/users/profile', userData);
        return response.data;
    },
};

// Service du panier (Gestion locale pour l'instant)
export const cartService = {
    getCart: async (): Promise<CartItem[]> => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },

    addToCart: async (product: Product, quantity: number = 1): Promise<CartItem[]> => {
        const cart = await cartService.getCart();
        const existingItem = cart.find(item => (item.product._id || item.product.id) === (product._id || product.id));

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },

    updateQuantity: async (productId: string, quantity: number): Promise<CartItem[]> => {
        let cart = await cartService.getCart();
        const item = cart.find(item => (item.product._id || item.product.id) === productId);

        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                cart = cart.filter(item => (item.product._id || item.product.id) !== productId);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },

    removeFromCart: async (productId: string): Promise<CartItem[]> => {
        let cart = await cartService.getCart();
        cart = cart.filter(item => (item.product._id || item.product.id) !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },

    clearCart: async (): Promise<void> => {
        localStorage.removeItem('cart');
    },

    getCartTotal: (items: CartItem[]): number => {
        return items.reduce((total, item) => total + (item.product.prix * item.quantity), 0);
    }
};

// Exporting types used in the services
import { CartItem } from '../types';

export default api;
