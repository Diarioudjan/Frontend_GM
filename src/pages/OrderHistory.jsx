import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getMyOrders();
      setOrders(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Erreur chargement commandes:', err);
      setError('Impossible de charger vos commandes. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Livrée':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'Expédiée':
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'En cours':
      case 'processing':
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Annulée':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300';
    }
  };

  const getStatusText = (status) => {
    // Si le statut est déjà en français, on le retourne tel quel
    // Sinon on le traduit (pour la compatibilité avec les anciennes données)
    const statusMap = {
      'delivered': 'Livrée',
      'shipped': 'Expédiée',
      'processing': 'En cours',
      'cancelled': 'Annulée',
      'pending': 'En attente'
    };
    return statusMap[status] || status;
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => {
      const status = getStatusText(order.status);
      if (filter === 'delivered') return status === 'Livrée';
      if (filter === 'shipped') return status === 'Expédiée';
      if (filter === 'processing') return status === 'En cours' || status === 'En attente';
      return false;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchOrders}
          className="mt-4 text-green-600 hover:text-green-700 font-medium"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Historique des commandes</h2>
        <p className="text-gray-600 dark:text-neutral-400 mt-1">
          Suivez vos commandes et consultez votre historique d'achats
        </p>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
          >
            Toutes ({orders.length})
          </button>
          <button
            onClick={() => setFilter('processing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'processing'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
          >
            En cours
          </button>
          <button
            onClick={() => setFilter('shipped')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'shipped'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
          >
            Expédiées
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'delivered'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
          >
            Livrées
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Aucune commande trouvée
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                {filter === 'all'
                  ? "Vous n'avez pas encore passé de commande"
                  : "Aucune commande ne correspond à ce filtre"
                }
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id} className="border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 dark:bg-neutral-700 px-6 py-4 border-b border-gray-200 dark:border-neutral-600">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Commande #{order._id.slice(-8)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {order.totalPrice?.toLocaleString()} GNF
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.orderItems?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-gray-200 dark:bg-neutral-600 rounded-lg flex items-center justify-center text-gray-500 dark:text-neutral-400">
                          {/* Placeholder image if no image available */}
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.nom || item.product?.nom || 'Produit'}</h4>
                          <p className="text-sm text-gray-600 dark:text-neutral-400">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {/* Prix unitaire si disponible, sinon on ne l'affiche pas car on a le total */}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-neutral-700">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                      Voir les détails
                    </button>
                    {getStatusText(order.status) === 'Livrée' && (
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Commander à nouveau
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
