// Configuration centrale de l'administration
export const ADMIN_CONFIG = {
  title: 'GuinéeMakiti Admin',
  version: '1.0.0',
  apiBaseUrl: import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  dateFormat: 'DD/MM/YYYY',
  currency: 'GNF'
};

// Modules d'administration
export const ADMIN_MODULES = {
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
    icon: '📋',
    description: 'Suivi des commandes',
    fields: [
      { name: 'customer', label: 'Client', type: 'text', required: true },
      { name: 'products', label: 'Produits', type: 'textarea' },
      { name: 'total', label: 'Total', type: 'number', required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['En attente', 'En cours', 'Livré', 'Annulé'] }
    ]
  },
  categories: {
    name: 'Catégories',
    path: '/admin/categories',
    icon: '🏷️',
    description: 'Gestion des catégories de produits',
    fields: [
      { name: 'name', label: 'Nom de la catégorie', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'icon', label: 'Icône', type: 'text' },
      { name: 'isActive', label: 'Active', type: 'checkbox' }
    ]
  },
  regions: {
    name: 'Régions',
    path: '/admin/regions',
    icon: '🗺️',
    description: 'Gestion des régions de livraison',
    fields: [
      { name: 'name', label: 'Nom de la région', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'shippingCost', label: 'Coût de livraison', type: 'number', required: true },
      { name: 'isActive', label: 'Active', type: 'checkbox' }
    ]
  },
  analytics: {
    name: 'Analytics',
    path: '/admin/analytics',
    icon: '📈',
    description: 'Statistiques et rapports'
  },
  settings: {
    name: 'Paramètres',
    path: '/admin/settings',
    icon: '⚙️',
    description: 'Configuration du système'
  }
};

// Permissions par rôle
export const PERMISSIONS = {
  admin: ['dashboard', 'users', 'products', 'orders', 'categories', 'regions', 'analytics', 'settings'],
  vendeur: ['dashboard', 'products', 'orders'],
  client: ['dashboard']
};

// Vérification des permissions
export const hasPermission = (userRole, permission) => {
  if (!userRole || !PERMISSIONS[userRole]) return false;
  return PERMISSIONS[userRole].includes(permission);
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

// Configuration des statuts
export const getStatusConfig = (type, status) => {
  const configs = {
    order: {
      'En attente': { color: 'yellow', icon: '⏳', label: 'En attente' },
      'En cours': { color: 'blue', icon: '🔄', label: 'En cours' },
      'Livré': { color: 'green', icon: '✅', label: 'Livré' },
      'Annulé': { color: 'red', icon: '❌', label: 'Annulé' }
    },
    user: {
      'active': { color: 'green', icon: '✅', label: 'Actif' },
      'inactive': { color: 'red', icon: '❌', label: 'Inactif' }
    },
    product: {
      'active': { color: 'green', icon: '✅', label: 'Actif' },
      'inactive': { color: 'red', icon: '❌', label: 'Inactif' }
    }
  };

  return configs[type]?.[status] || { color: 'gray', icon: '❓', label: status };
}; 