import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Profile from './Profile';
import OrderHistory from './OrderHistory';
import Wishlist from './Wishlist';
import { orderService, formatCurrency } from '../services/api';
import { User, Order } from '../types';

const Dashboard: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth() as { user: User | null; isAuthenticated: boolean; logout: () => void; };
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [stats, setStats] = useState<{ total: number; pending: number; favoris: number }>({ total: 0, pending: 0, favoris: 0 });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) {
            setActiveTab(tab);
        } else {
            setActiveTab('overview');
        }
    }, [location]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!isAuthenticated) return;
            try {
                setLoading(true);
                const response = await orderService.getUserOrders();
                // response is response.data from api.js: { status, data: { orders: [...] } }
                const orders: Order[] = (response && response.data && response.data.orders) ? response.data.orders : [];

                // Calculate stats based on real data
                const pendingOrders = orders.filter(o => {
                    const status = o.status?.toLowerCase();
                    return ['en attente', 'en cours', 'expédiée', 'pending', 'processing', 'shipped'].includes(status);
                });

                setStats({
                    total: orders.length,
                    pending: pendingOrders.length,
                    favoris: 0 // Fetch from wishlist service if available in future
                });

                setRecentOrders(orders.slice(0, 5));
            } catch (error) {
                console.error('Erreur stats dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [isAuthenticated]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        navigate(`/dashboard?tab=${tabId}`);
    };

    if (!isAuthenticated) {
        navigate('/connexion');
        return null;
    }

    const Overview: React.FC = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Welcome Section */}
            <div>
                <h2 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                    Bonjour, <span className="text-primary-500">{user?.prenom}</span> 👋
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
                    Heureux de vous revoir sur votre espace premium. Voici l'état de vos activités.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] shadow-soft hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-primary-500/10 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📦</div>
                        <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Total Achats</span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-neutral-900 dark:text-white leading-none">
                            {loading ? '...' : String(stats.total).padStart(2, '0')}
                        </h4>
                        <p className="text-[9px] font-bold text-neutral-500 uppercase mt-1 tracking-tight">Commandes passées</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] shadow-soft hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🚚</div>
                        <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">En cours</span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-neutral-900 dark:text-white leading-none">
                            {loading ? '...' : String(stats.pending).padStart(2, '0')}
                        </h4>
                        <p className="text-[9px] font-bold text-neutral-500 uppercase mt-1 tracking-tight">Livraisons attendues</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] shadow-soft hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform">❤️</div>
                        <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Favoris</span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-neutral-900 dark:text-white leading-none">
                            {loading ? '...' : '08'}
                        </h4>
                        <p className="text-[9px] font-bold text-neutral-500 uppercase mt-1 tracking-tight">Produits sauvegardés</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] shadow-soft">
                        <h3 className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.2em] mb-4">Actions Rapides</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => handleTabChange('orders')} className="p-3 bg-neutral-100/50 dark:bg-[#1a1a1a] rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-center group border border-neutral-100 dark:border-white/5">
                                <span className="block text-base mb-1 group-hover:scale-110 transition-transform">📍</span>
                                <span className="text-[8px] font-black uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500">Suivre</span>
                            </button>
                            <Link to="/support" className="p-3 bg-neutral-100/50 dark:bg-[#1a1a1a] rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-center group border border-neutral-100 dark:border-white/5">
                                <span className="block text-base mb-1 group-hover:scale-110 transition-transform">💬</span>
                                <span className="text-[8px] font-black uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500">Support</span>
                            </Link>
                            <button onClick={() => handleTabChange('profile')} className="p-3 bg-neutral-100/50 dark:bg-[#1a1a1a] rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-center group border border-neutral-100 dark:border-white/5">
                                <span className="block text-base mb-1 group-hover:scale-110 transition-transform">🏠</span>
                                <span className="text-[8px] font-black uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500">Profil</span>
                            </button>
                            <button className="p-3 bg-neutral-100/50 dark:bg-[#1a1a1a] rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-center group border border-neutral-100 dark:border-white/5">
                                <span className="block text-base mb-1 group-hover:scale-110 transition-transform">📄</span>
                                <span className="text-[8px] font-black uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500">Factures</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#f27405] p-5 rounded-2xl text-white shadow-lg overflow-hidden relative group">
                        <div className="relative z-10">
                            <p className="text-[8px] font-black uppercase tracking-widest opacity-80">Guinée Makiti Pro</p>
                            <h4 className="text-sm font-black mt-1 leading-tight">Devenez vendeur et booster vos revenus</h4>
                            <button className="mt-4 px-4 py-1.5 bg-white text-[#f27405] rounded-lg text-[8px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                En savoir plus
                            </button>
                        </div>
                        <div className="absolute -right-2 -bottom-2 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-500">💰</div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] overflow-hidden shadow-soft">
                        <div className="p-4 border-b border-neutral-100 dark:border-[#1a1a1a] flex justify-between items-center bg-neutral-50/50 dark:bg-[#1a1a1a]/40">
                            <h3 className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.2em]">Achats récents</h3>
                            <button onClick={() => handleTabChange('orders')} className="text-[9px] font-black text-primary-500 hover:text-primary-600 uppercase tracking-widest">Voir tout</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-50/50 dark:bg-[#0d0d0d] text-[9px] font-black text-neutral-400 uppercase tracking-widest px-4">
                                    <tr>
                                        <th className="px-4 py-3">Commande</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3 text-right">Montant</th>
                                        <th className="px-4 py-3 text-center">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50 dark:divide-[#1a1a1a]">
                                    {loading ? (
                                        <tr><td colSpan={4} className="text-center py-6 opacity-50 uppercase text-[8px] font-bold tracking-widest">Chargement...</td></tr>
                                    ) : recentOrders.length === 0 ? (
                                        <tr><td colSpan={4} className="text-center py-6 opacity-50 uppercase text-[8px] font-bold tracking-widest">Aucune commande</td></tr>
                                    ) : (
                                        recentOrders.map((order: any, i) => (
                                            <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-[#1a1a1a]/40 transition-colors group cursor-pointer" onClick={() => navigate(`/commande/${order._id}`)}>
                                                <td className="px-4 py-4">
                                                    <span className="text-xs font-black text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors uppercase">
                                                        #{order._id.slice(-6)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
                                                        {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <span className="text-xs font-bold text-neutral-900 dark:text-white">{formatCurrency(order.totalPrice || order.total)}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tight border ${['livrée', 'delivered'].includes(order.status?.toLowerCase()) ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                                                        ['expédiée', 'shipped'].includes(order.status?.toLowerCase()) ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' :
                                                            'border-orange-500/20 text-orange-500 bg-orange-500/5'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleLogout = () => {
        if (logout) {
            logout();
        } else {
            // Fallback
            localStorage.removeItem('token');
        }
        navigate('/connexion');
    };

    return (
        <div className="bg-[#FAFAFA] dark:bg-[#050505] min-h-screen pt-28 pb-20 font-inter">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Sidebar Menu */}
                    <aside className="w-full lg:w-[280px] shrink-0">
                        {/* Profile Summary */}
                        <div className="flex items-center gap-4 mb-10 px-4">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xl text-orange-600 border border-orange-200">
                                    {user?.prenom?.charAt(0) || 'U'}
                                </div>
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-neutral-900 dark:text-white capitalize">{user?.prenom} {user?.nom}</h3>
                                <p className="text-xs font-semibold text-orange-500">Client Gold</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-1.5 flex flex-col">
                            <button
                                onClick={() => handleTabChange('overview')}
                                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[13px] font-bold ${activeTab === 'overview' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-neutral-500 hover:bg-white dark:hover:bg-[#111] hover:text-orange-500'}`}
                            >
                                <span className="text-lg opacity-80">⊞</span> Tableau de bord
                            </button>

                            <Link
                                to="/produits"
                                className="flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[13px] font-bold text-neutral-500 hover:bg-white dark:hover:bg-[#111] hover:text-orange-500"
                            >
                                <span className="text-lg opacity-80">🏪</span> Boutique
                            </Link>

                            <Link
                                to="/panier"
                                className="flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[13px] font-bold text-neutral-500 hover:bg-white dark:hover:bg-[#111] hover:text-orange-500"
                            >
                                <span className="text-lg opacity-80">🛒</span> Panier
                            </Link>

                            <button
                                onClick={() => handleTabChange('orders')}
                                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[13px] font-bold ${activeTab === 'orders' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-neutral-500 hover:bg-white dark:hover:bg-[#111] hover:text-orange-500'}`}
                            >
                                <span className="text-lg opacity-80">🧾</span> Mes commandes
                            </button>

                            <button
                                onClick={() => handleTabChange('wishlist')}
                                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[13px] font-bold ${activeTab === 'wishlist' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-neutral-500 hover:bg-white dark:hover:bg-[#111] hover:text-orange-500'}`}
                            >
                                <span className="text-lg opacity-80">🔔</span> Notifications
                            </button>

                            <button
                                onClick={() => handleTabChange('profile')}
                                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[13px] font-bold ${activeTab === 'profile' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-neutral-500 hover:bg-white dark:hover:bg-[#111] hover:text-orange-500'}`}
                            >
                                <span className="text-lg opacity-80">👤</span> Profil
                            </button>

                            <hr className="my-6 border-neutral-200 dark:border-neutral-800" />

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[13px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                                <span className="text-lg opacity-80">🚪</span> Déconnexion
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 lg:pl-4 min-w-0">
                        {activeTab === 'overview' && <Overview />}
                        {activeTab === 'orders' && <OrderHistory />}
                        {activeTab === 'wishlist' && <Wishlist isComponent={true} />}
                        {activeTab === 'profile' && <Profile />}
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
