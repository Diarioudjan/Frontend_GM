import axios from 'axios';

// Configuration de base d'Axios
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
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
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obtenir les informations de l'utilisateur
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Fonctions utilitaires
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'GNF',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date) => {
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
  // Obtenir tous les produits
  getAllProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Obtenir un produit par ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Obtenir les produits par catégorie
  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // Obtenir les produits par région
  getProductsByRegion: async (region) => {
    const response = await api.get(`/products/region/${region}`);
    return response.data;
  },

  // Rechercher des produits
  searchProducts: async (query) => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Obtenir les produits vedettes
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  // Obtenir les catégories
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Obtenir les régions
  getRegions: async () => {
    const response = await api.get('/products/regions');
    return response.data;
  },

  // Obtenir mes produits (pour vendeurs)
  getMyProducts: async () => {
    const response = await api.get('/products/my-products');
    return response.data;
  },

  // Créer un nouveau produit
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Mettre à jour un produit
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Supprimer un produit
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Service des commandes
export const orderService = {
  // Créer une nouvelle commande
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Obtenir les commandes de l'utilisateur
  getUserOrders: async () => {
    const response = await api.get('/orders/user');
    return response.data;
  },

  // Obtenir une commande par ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Annuler une commande
  cancelOrder: async (id) => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },

  // Suivre une commande
  trackOrder: async (id) => {
    const response = await api.get(`/orders/${id}/track`);
    return response.data;
  },

  // Obtenir mes commandes (pour vendeurs)
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  // Mettre à jour le statut d'une commande
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Obtenir toutes les commandes (Admin)
  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
};

// Service des utilisateurs
export const userService = {
  // Obtenir le profil de l'utilisateur
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Mettre à jour le profil
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Changer le mot de passe
  changePassword: async (passwordData) => {
    const response = await api.put('/users/password', passwordData);
    return response.data;
  },

  // Obtenir les adresses de livraison
  getAddresses: async () => {
    const response = await api.get('/users/addresses');
    return response.data;
  },

  // Ajouter une adresse
  addAddress: async (addressData) => {
    const response = await api.post('/users/addresses', addressData);
    return response.data;
  },

  // Mettre à jour une adresse
  updateAddress: async (id, addressData) => {
    const response = await api.put(`/users/addresses/${id}`, addressData);
    return response.data;
  },

  // Supprimer une adresse
  deleteAddress: async (id) => {
    const response = await api.delete(`/users/addresses/${id}`);
    return response.data;
  },

  // Obtenir tous les utilisateurs (Admin)
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};

// Service du panier (API Backend)
export const cartService = {
  // Obtenir le panier
  getCart: async () => {
    try {
      if (!authService.isAuthenticated()) return [];
      const response = await api.get('/cart');
      // Le backend renvoie { status: 'success', data: { cart: { items: [...] } } }
      // Nous voulons retourner le tableau d'items ou le panier complet selon l'usage
      // Pour compatibilité avec l'existant qui attendait un tableau d'items :
      return response.data.data.cart ? response.data.data.cart.items : [];
    } catch (error) {
      console.error('Erreur getCart:', error);
      return [];
    }
  },

  // Ajouter un produit au panier
  addToCart: async (product, quantity = 1) => {
    try {
      if (!authService.isAuthenticated()) {
        // Fallback local pour les non-connectés ? Ou redirection ?
        // Pour l'instant on retourne null ou erreur pour forcer la connexion
        // window.location.href = '/connexion';
        return [];
      }

      const response = await api.post('/cart/add', {
        productId: product.id || product._id,
        quantity
      });
      return response.data.data.cart.items;
    } catch (error) {
      console.error('Erreur addToCart:', error);
      throw error;
    }
  },

  // Mettre à jour la quantité
  updateQuantity: async (productId, quantity) => {
    try {
      if (!authService.isAuthenticated()) return [];

      const response = await api.put(`/cart/update/${productId}`, { quantity });
      return response.data.data.cart.items;
    } catch (error) {
      console.error('Erreur updateQuantity:', error);
      throw error;
    }
  },

  // Supprimer un produit du panier
  removeFromCart: async (productId) => {
    try {
      if (!authService.isAuthenticated()) return [];

      const response = await api.delete(`/cart/remove/${productId}`);
      return response.data.data.cart.items;
    } catch (error) {
      console.error('Erreur removeFromCart:', error);
      throw error;
    }
  },

  // Vider le panier
  clearCart: async () => {
    try {
      if (!authService.isAuthenticated()) return [];

      await api.delete('/cart/clear');
      return [];
    } catch (error) {
      console.error('Erreur clearCart:', error);
      return [];
    }
  },

  // Obtenir le nombre total d'articles (helper local si on a déjà les items, sinon appel API)
  getCartItemCount: async () => {
    try {
      if (!authService.isAuthenticated()) return 0;
      const response = await api.get('/cart/count');
      return response.data.data.itemCount;
    } catch (error) {
      return 0;
    }
  },

  // Calculer le total du panier (calculé côté backend ou frontend ?)
  // Le backend le fait généralement, mais ici on le recalcule pour l'instant ou on récupère du backend si disponible
  getCartTotal: (cartItems) => {
    // Si on passe les items en paramètre (car sync)
    if (Array.isArray(cartItems)) {
      return cartItems.reduce((total, item) => {
        // item.product est peuplé par le backend { nom, prix, ... }
        const price = item.product ? item.product.prix : 0;
        return total + (price * item.quantity);
      }, 0);
    }
    return 0;
  },
};

// Service de paiement
export const paymentService = {
  // Initialiser un paiement Orange Money
  initOrangeMoneyPayment: async (paymentData) => {
    const response = await api.post('/payments/orange-money', paymentData);
    return response.data;
  },

  // Initialiser un paiement MTN MoMo
  initMTNMoMoPayment: async (paymentData) => {
    const response = await api.post('/payments/mtn-momo', paymentData);
    return response.data;
  },

  // Vérifier le statut d'un paiement
  checkPaymentStatus: async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}/status`);
    return response.data;
  },
};

// Service de contact
export const contactService = {
  // Envoyer un message de contact
  sendMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },
};

export default api; 