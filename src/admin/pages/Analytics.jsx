import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    salesData: [],
    topProducts: [],
    topRegions: [],
    userGrowth: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnalytics({
        salesData: [
          { month: 'Jan', sales: 12000000 },
          { month: 'Fév', sales: 15000000 },
          { month: 'Mar', sales: 18000000 },
          { month: 'Avr', sales: 22000000 },
          { month: 'Mai', sales: 25000000 },
          { month: 'Juin', sales: 28000000 }
        ],
        topProducts: [
          { name: 'Riz local', sales: 156, revenue: 780000 },
          { name: 'Huile de palme', sales: 89, revenue: 222500 },
          { name: 'Poulet local', sales: 67, revenue: 1005000 }
        ],
        topRegions: [
          { name: 'Conakry', orders: 234, revenue: 3500000 },
          { name: 'Kindia', orders: 189, revenue: 2800000 },
          { name: 'Kankan', orders: 156, revenue: 2200000 }
        ],
        userGrowth: [
          { month: 'Jan', users: 850 },
          { month: 'Fév', users: 920 },
          { month: 'Mar', users: 1050 },
          { month: 'Avr', users: 1180 },
          { month: 'Mai', users: 1320 },
          { month: 'Juin', users: 1450 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Analysez les performances de votre plateforme</p>
      </div>

      {/* Graphique des ventes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution des ventes</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {analytics.salesData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(data.sales / 30000000) * 200}px` }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Produits populaires */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Produits les plus vendus</h3>
        <div className="space-y-4">
          {analytics.topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.sales} ventes</p>
              </div>
              <p className="font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Régions populaires */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Régions les plus actives</h3>
        <div className="space-y-4">
          {analytics.topRegions.map((region, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{region.name}</p>
                <p className="text-sm text-gray-600">{region.orders} commandes</p>
              </div>
              <p className="font-medium text-gray-900">{formatCurrency(region.revenue)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 