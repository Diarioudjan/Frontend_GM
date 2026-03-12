import { AdminConfig, AdminModules, StatusConfig, StatusType, OrderStatus, ProductStatus, UserStatus, PaymentStatus } from '../types/admin';

// Configuration centrale de l'administration
export const ADMIN_CONFIG: AdminConfig = {
  title: 'GuinéeMakiti Admin',
  version: '1.0.0',
  apiBaseUrl: import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  dateFormat: 'DD/MM/YYYY',
  currency: 'GNF'
};

// Modules d'administration
export const ADMIN_MODULES: AdminModules = {
  dashboard: {
    name: 'Tableau de bord',
    path: '/admin/dashboard',
    icon: '📊',
    description: 'Vue d\'ensemble de la plateforme'
  },
  users: {
    name: 'Utilisateurs',
    path: '/admin/users',
    icon: '👥',
    description: 'Gestion des comptes utilisateurs',
    permissions: ['view_users'],
    fields: [
      { name: 'name', label: 'Nom complet', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel' },
      { name: 'role', label: 'Rôle', type: 'select', options: ['client', 'vendeur', 'admin'] },
      { name: 'status', label: 'Statut', type: 'select', options: ['active', 'inactive'] }
    ]
  },
  products: {
    name: 'Produits',
    path: '/admin/products',
    icon: '📦',
    description: 'Gestion du catalogue produits',
    fields: [
      { name: 'name', label: 'Nom du produit', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'price', label: 'Prix', type: 'number', required: true },
      { name: 'stock', label: 'Stock', type: 'number', required: true },
      { name: 'category', label: 'Catégorie', type: 'select', options: ['Céréales', 'Huiles', 'Légumes', 'Viandes'] },
      { name: 'region', label: 'Région', type: 'select', options: ['Conakry', 'Kindia', 'Kankan', 'Labé', 'Nzérékoré'] }
    ]
  },
  orders: {
    name: 'Commandes',
    path: '/admin/orders',
    icon: '📝',
    description: 'Gestion des commandes',
    permissions: ['view_orders'],
    fields: [
      { name: 'customer', label: 'Client', type: 'text', required: true },
      { name: 'products', label: 'Produits', type: 'textarea' },
      { name: 'total', label: 'Total', type: 'number', required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] }
    ]
  },
    categories: {
    name: 'Catégories',
    path: '/admin/categories',
    icon: '🏷️',
    description: 'Gestion des catégories',
    permissions: ['manage_categories']
  },
  settings: {
    name: 'Paramètres',
    path: '/admin/settings',
    icon: '⚙️',
    description: 'Configuration du système',
    permissions: ['manage_settings']
  }
};

// Vérification des permissions
export const hasPermission = (userRole: string, permission: string): boolean => {
  if (!userRole || !USER_ROLES[userRole]) return false;
  return USER_ROLES[userRole].permissions.includes(permission);
};

// Fonctions utilitaires
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'GNF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Configuration des statuts
export const getStatusConfig = (type: StatusType, status: string): StatusConfig => {
  const statusConfigs = {
    order: {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
      processing: { label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: '🔄' },
      shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-800', icon: '🚚' },
      delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800', icon: '✅' },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800', icon: '❌' }
    },
    user: {
      active: { label: 'Actif', color: 'bg-green-100 text-green-800', icon: '✓' },
      inactive: { label: 'Inactif', color: 'bg-gray-100 text-gray-800', icon: '○' },
      suspended: { label: 'Suspendu', color: 'bg-red-100 text-red-800', icon: '⛔' }
    },
    product: {
      draft: { label: 'Brouillon', color: 'bg-gray-100 text-gray-800', icon: '📝' },
      published: { label: 'Publié', color: 'bg-green-100 text-green-800', icon: '✓' },
      out_of_stock: { label: 'Rupture', color: 'bg-red-100 text-red-800', icon: '⚠️' },
      discontinued: { label: 'Arrêté', color: 'bg-gray-800 text-white', icon: '⛔' }
    },
    payment: {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
      paid: { label: 'Payé', color: 'bg-green-100 text-green-800', icon: '✓' },
      failed: { label: 'Échoué', color: 'bg-red-100 text-red-800', icon: '❌' },
      refunded: { label: 'Remboursé', color: 'bg-gray-100 text-gray-800', icon: '↩️' }
    }
  };

  const config = statusConfigs[type]?.[status as keyof typeof statusConfigs[StatusType]];
  
  return config || { 
    label: status, 
    color: 'bg-gray-100 text-gray-800', 
    icon: '❓' 
  };
};