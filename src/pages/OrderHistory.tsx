import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { orderService } from '../services/api';
// @ts-ignore
import { useCart } from '../context/CartContext';
import { Order, OrderItem } from '../types';

const OrderHistory: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>('all');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await orderService.getUserOrders();
            if (response && response.data && response.data.orders) {
                setOrders(response.data.orders);
            } else if (response && Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setOrders([]);
            }
            setError(null);
        } catch (err) {
            console.error('Erreur chargement commandes:', err);
            setError('Impossible de charger vos commandes. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'livrée':
            case 'delivered':
                return 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-bold';
            case 'en cours':
            case 'processing':
                return 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold';
            case 'en attente':
            case 'pending':
                return 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold';
            case 'expédiée':
            case 'shipped':
                return 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold';
            case 'annulée':
            case 'cancelled':
                return 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold';
            default:
                return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold';
        }
    };

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            'delivered': 'Livrée',
            'shipped': 'Expédiée',
            'processing': 'En cours',
            'cancelled': 'Annulée',
            'pending': 'En attente'
        };
        return statusMap[status?.toLowerCase()] || status || 'Inconnu';
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => {
            const status = getStatusText(order.status).toLowerCase();
            if (filter === 'delivered') return status === 'livrée';
            if (filter === 'processing') return status === 'en cours';
            if (filter === 'pending') return status === 'en attente';
            return false;
        });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={fetchOrders}
                    className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary-500 hover:text-primary-600 transition-colors"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    // Calculs pour les stats (Exemples stylisés comme la maquette)
    const totalCommandes = orders.length;
    const enCoursCount = orders.filter(o => ['en cours', 'processing', 'en attente', 'pending', 'shipped'].includes(o.status?.toLowerCase())).length;
    const totalDepenses = orders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
    const pointsRewards = Math.floor(totalDepenses / 1000);

    const statCards = [
        { label: 'TOTAL COMMANDES', value: totalCommandes < 10 && totalCommandes > 0 ? `0${totalCommandes}` : totalCommandes, sub: '+2 ce mois', subColor: 'text-green-500' },
        { label: 'EN COURS', value: enCoursCount < 10 && enCoursCount > 0 ? `0${enCoursCount}` : enCoursCount, sub: 'À livrer', subColor: 'text-orange-500' },
        { label: 'DÉPENSES TOTALES', value: totalDepenses > 1000000 ? `${(totalDepenses / 1000000).toFixed(1)}M` : totalDepenses.toLocaleString(), suffix: 'GNF', sub: '', subColor: '' },
        { label: 'RÉCOMPENSES', value: pointsRewards.toLocaleString(), suffix: 'pts', sub: '', subColor: '', icon: '🏆', iconColor: 'text-orange-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-6 lg:mt-0">
            {/* Header Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">Mes commandes</h1>
                    <p className="text-sm font-medium text-neutral-500 mt-1">Gérez et suivez l'historique de vos achats en un coup d'œil.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] rounded-full text-sm font-bold shadow-sm hover:shadow transition-all w-fit">
                    <span className="text-lg">📥</span> Exporter
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] p-5 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">{stat.label}</p>
                        <div className="flex items-end gap-2">
                            {stat.icon && <span className={`text-xl ${stat.iconColor}`}>{stat.icon}</span>}
                            <h3 className={`text-3xl font-black text-neutral-900 dark:text-white leading-none ${stat.iconColor ? stat.iconColor : ''} ${stat.value.toString().includes('M') ? 'tracking-tighter' : ''}`}>
                                {stat.value}
                            </h3>
                            {stat.suffix && <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 pb-1">{stat.suffix}</span>}
                            {stat.sub && <span className={`text-[10px] font-bold pb-1 ml-auto ${stat.subColor}`}>{stat.sub}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'all', label: 'Toutes' },
                        { id: 'pending', label: 'En attente' },
                        { id: 'processing', label: 'En cours' },
                        { id: 'delivered', label: 'Livrées' }
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${filter === btn.id
                                    ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
                                    : 'bg-white dark:bg-[#0a0a0a] border-neutral-200 dark:border-[#1a1a1a] text-neutral-600 dark:text-neutral-400 hover:border-orange-500/30'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
                <div className="relative w-fit">
                    <select className="appearance-none bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] text-neutral-700 dark:text-neutral-300 text-xs font-bold rounded-full px-5 py-2.5 pr-10 outline-none focus:border-orange-500 transition-colors">
                        <option>30 derniers jours</option>
                        <option>3 derniers mois</option>
                        <option>Cette année</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">▼</span>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="bg-[#FAFAFA] dark:bg-[#0d0d0d] border-b border-neutral-200 dark:border-[#1a1a1a]">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">ID Commande</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Montant Total</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Statut</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-[#1a1a1a]">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm font-medium text-neutral-500">
                                        Aucune commande trouvée.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => {
                                    let statusIcon = '📦';
                                    const statL = order.status?.toLowerCase();
                                    if (statL === 'livrée' || statL === 'delivered') statusIcon = '🚚';
                                    if (statL === 'annulée' || statL === 'cancelled') statusIcon = '✖️';
                                    if (statL === 'en attente' || statL === 'pending') statusIcon = '🕒';

                                    return (
                                        <tr key={order._id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#111] transition-colors group">
                                            <td className="px-6 py-5 whitespace-nowrap flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-lg shadow-sm">
                                                    {statusIcon}
                                                </div>
                                                <span className="text-sm font-black text-neutral-900 dark:text-white uppercase">#{order._id.slice(-6)}</span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                    {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="text-sm font-black text-neutral-900 dark:text-white">
                                                    {order.totalPrice?.toLocaleString()} GNF
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
                                                    {getStatusText(order.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-right">
                                                <button
                                                    onClick={() => navigate(`/commande/${order._id}`)}
                                                    className="px-5 py-2.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 rounded-full transition-colors inline-block"
                                                >
                                                    Détails
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Block */}
                <div className="px-6 py-4 border-t border-neutral-100 dark:border-[#1a1a1a] flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#FAFAFA] dark:bg-[#0a0a0a]">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Affichage 1-{filteredOrders.length || 0} sur {orders.length}</span>
                    <div className="flex gap-1.5">
                        <button className="w-8 h-8 rounded-full border border-neutral-200 dark:border-[#1a1a1a] flex items-center justify-center text-neutral-400 hover:text-orange-500 hover:border-orange-500 transition-colors text-xs">&lt;</button>
                        <button className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-orange-500/20">1</button>
                        <button className="w-8 h-8 rounded-full border border-neutral-200 dark:border-[#1a1a1a] flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-orange-500 hover:border-orange-500 transition-colors text-xs font-bold">2</button>
                        <button className="w-8 h-8 rounded-full border border-neutral-200 dark:border-[#1a1a1a] flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-orange-500 hover:border-orange-500 transition-colors text-xs font-bold">3</button>
                        <button className="w-8 h-8 rounded-full border border-neutral-200 dark:border-[#1a1a1a] flex items-center justify-center text-neutral-400 hover:text-orange-500 hover:border-orange-500 transition-colors text-xs">&gt;</button>
                    </div>
                </div>
            </div>

            {/* Support CTA */}
            <div className="bg-[#2A241F] dark:bg-[#111] rounded-[2rem] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl mt-12">
                <div className="relative z-10 w-full md:w-auto text-center md:text-left">
                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">Besoin d'assistance ?</h3>
                    <p className="text-[#A39E98] text-sm md:max-w-md w-full">Notre équipe support est disponible 24/7 pour répondre à vos questions sur vos commandes en cours.</p>
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                    <button onClick={() => navigate('/faq')} className="w-full sm:w-auto px-6 py-4 rounded-full border border-white/20 text-white font-bold text-sm text-center hover:bg-white/10 transition-colors">
                        Consulter la FAQ
                    </button>
                    <button onClick={() => navigate('/contact')} className="w-full sm:w-auto px-6 py-4 rounded-full bg-orange-500 text-white font-bold text-sm text-center shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
                        Nous contacter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;

