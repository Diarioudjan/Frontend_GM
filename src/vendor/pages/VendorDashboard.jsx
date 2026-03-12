import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { productService, orderService, formatCurrency } from '../../services/api';

const VendorDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSales: 0,
        pendingOrders: 0,
        lowStock: 0,
        weeklyRevenue: 0,
        monthlyStats: []
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                const [statsRes, ordersRes] = await Promise.all([
                    orderService.getVendorStats(),
                    orderService.getMyOrders()
                ]);

                if (statsRes.status === 'success') {
                    const s = statsRes.data;
                    setStats({
                        totalSales: s.totalRevenue,
                        pendingOrders: s.pendingOrdersCount,
                        lowStock: s.lowStockProducts,
                        weeklyRevenue: s.totalRevenue, // Placeholder for weekly if not specific
                        monthlyStats: s.monthlyStats || []
                    });
                }

                if (ordersRes.status === 'success') {
                    setRecentOrders(ordersRes.data.orders.slice(0, 5));
                }
            } catch (error) {
                console.error('Erreur chargement dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f27405]"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700">
            {/* Welcome Banner */}
            <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 mb-4 border border-neutral-200 dark:border-[#1a1a1a] relative overflow-hidden group shadow-soft transition-colors duration-300">
                <div className="relative z-10 max-w-xl">
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-white mb-1.5">
                        Bienvenue, {user?.boutiqueNom || user?.prenom || 'Vendeur'} 👋
                    </h1>
                    <p className="text-neutral-400 text-sm">
                        Gérez vos produits et suivez vos performances en direct.
                    </p>
                    <button
                        onClick={() => window.location.href = '/vendor/products'}
                        className="mt-4 bg-[#f27405] hover:bg-[#ff8c2b] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-[#f27405]/20 text-xs"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Gérer mes produits
                    </button>
                </div>

                {/* Decorative Truck Icon */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500">
                    <svg className="w-40 h-40 text-neutral-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 16h-10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2h6c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2m-14-11v11h2.2c.4-1.2 1.5-2 2.8-2s2.4.8 2.8 2h4.4c.4-1.2 1.5-2 2.8-2s2.4.8 2.8 2h1.2v-5l-4-6h-13m13 1.5l1.66 2.5h-4.66v-2.5h3z" />
                    </svg>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-[#0a0a0a] rounded-xl p-4 border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#f27405]/30 shadow-soft transition-all text-sm">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10">
                            <svg className="w-4 h-4 text-[#f27405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-tight mb-0.5">Revenu Total (GNF)</p>
                    <h3 className="text-lg font-black text-neutral-900 dark:text-white">{formatCurrency(stats.totalSales)}</h3>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] rounded-xl p-4 border border-neutral-200 dark:border-[#1a1a1a] hover:border-blue-500/20 shadow-soft transition-all text-sm">
                    <div className="flex items-center mb-2">
                        <div className="p-2 bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-4.44-12.29c.246-.835.539-1.644.87-2.427M17.076 6.136c.328.783.621 1.592.867 2.427m0 4.22c.11.353.208.71.294 1.071m0 4.22c-.11.353-.208.71-.294 1.071m-2.753-12.29c.148-.5.304-.988.467-1.464M5.247 18.332c1.744-2.772 2.753-6.054 2.753-9.571m11.942 9.571c-1.744-2.772-2.753-6.054-2.753-9.571m-4.441 12.29c-.148-.5-.304-.988-.467-1.464" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-tight mb-0.5">Commandes en attente</p>
                    <h3 className="text-lg font-black text-neutral-900 dark:text-white">{stats.pendingOrders}</h3>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] rounded-xl p-4 border border-neutral-200 dark:border-[#1a1a1a] hover:border-red-500/20 shadow-soft transition-all text-sm">
                    <div className="flex items-center mb-2">
                        <div className="p-2 bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10">
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-tight mb-0.5">Rupture de stock</p>
                    <h3 className="text-lg font-black text-neutral-900 dark:text-white">{stats.lowStock}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart Simulation */}
                <div className="lg:col-span-1 bg-white dark:bg-[#0a0a0a] rounded-xl p-5 border border-neutral-200 dark:border-[#1a1a1a] shadow-soft transition-colors duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Evolution Mensuelle</h2>
                    </div>

                    <div className="h-32 flex items-end justify-between gap-1.5 px-1">
                        {stats.monthlyStats.length > 0 ? stats.monthlyStats.map((month, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                                <div
                                    className="w-full bg-[#f27405] rounded-t-md opacity-80"
                                    style={{ height: `${(month.revenue / Math.max(...stats.monthlyStats.map(m => m.revenue), 1)) * 100}%` }}
                                ></div>
                                <span className="text-[7px] font-bold text-neutral-500">M{month._id}</span>
                            </div>
                        )) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400 text-[10px] text-center italic">
                                Pas encore assez de données
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-[#1a1a1a] overflow-hidden shadow-soft transition-colors duration-300">
                    <div className="p-4 pb-1.5 flex justify-between items-center">
                        <h2 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Dernières commandes</h2>
                        <button
                            onClick={() => window.location.href = '/vendor/orders'}
                            className="text-[#f27405] text-[10px] font-bold hover:underline underline-offset-4 transition-all"
                        >
                            Voir tout
                        </button>
                    </div>

                    <div className="px-4 overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] h-12">
                                    <th className="px-6">Acheteur</th>
                                    <th className="px-6">Montant</th>
                                    <th className="px-6">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length > 0 ? recentOrders.map((order) => (
                                    <tr key={order._id} className="bg-neutral-50/50 dark:bg-[#1a1a1a]/30 hover:bg-neutral-100 dark:hover:bg-[#1a1a1a]/60 transition-colors group">
                                        <td className="px-4 py-3 first:rounded-l-xl text-xs text-neutral-400 font-medium">
                                            <div className="flex flex-col">
                                                <span className="text-neutral-900 dark:text-white font-semibold">{order.user?.prenom} {order.user?.nom}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs font-black text-neutral-900 dark:text-white">
                                            {formatCurrency(order.orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0))}
                                        </td>
                                        <td className="px-4 py-3 last:rounded-r-xl">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest border ${order.status === 'Livrée'
                                                ? 'border-green-500/20 text-green-500 bg-green-500/5'
                                                : order.status === 'En attente'
                                                    ? 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5'
                                                    : 'border-blue-500/20 text-blue-500 bg-blue-500/5'
                                                }`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-10 text-center text-neutral-500 text-sm italic">
                                            Aucune commande pour le moment
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
