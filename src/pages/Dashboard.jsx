import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Profile from './Profile';
import OrderHistory from './OrderHistory';
import VendorProducts from './VendorProducts';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');


  useEffect(() => {
    // Gérer l'onglet actif via l'URL query param
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);



  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/dashboard?tab=${tabId}`);
  };



  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 md:py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mon Espace
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Bienvenue, <span className="font-medium text-gray-900 dark:text-white">{user?.prenom} {user?.nom}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200 dark:border-neutral-700 overflow-x-auto">
          <nav className="-mb-px flex space-x-8">


            <button
              onClick={() => handleTabChange('orders')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders'
                ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:border-gray-300 dark:hover:border-neutral-600'
                }`}
            >
              <span className="mr-2">📦</span>
              Mes Commandes
            </button>

            {(user?.role === 'vendeur' || user?.role === 'admin') && (
              <button
                onClick={() => handleTabChange('products')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'products'
                  ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:border-gray-300 dark:hover:border-neutral-600'
                  }`}
              >
                <span className="mr-2">🏷️</span>
                Mes Produits
              </button>
            )}

            <button
              onClick={() => handleTabChange('profile')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:border-gray-300 dark:hover:border-neutral-600'
                }`}
            >
              <span className="mr-2">👤</span>
              Mon Profil
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {activeTab === 'orders' && <OrderHistory />}

        {activeTab === 'products' && (user?.role === 'vendeur' || user?.role === 'admin') && (
          <VendorProducts />
        )}

        {activeTab === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default Dashboard; 