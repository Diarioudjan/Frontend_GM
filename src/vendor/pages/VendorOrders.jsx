import React, { useState, useEffect } from 'react';
import { orderService, formatCurrency, formatDate } from '../../services/api';

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('Toutes');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await orderService.getMyOrders();
            setOrders(response.data.orders || []);
        } catch (error) {
            console.error('Erreur chargement commandes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.error('Erreur mise à jour statut:', error);
            alert('Impossible de mettre à jour le statut.');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Livrée': return 'border-green-500/20 text-green-500 bg-green-500/5';
            case 'En attente': return 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5';
            case 'En préparation': return 'border-blue-500/20 text-blue-500 bg-blue-500/5';
            case 'Expédiée': return 'border-purple-500/20 text-purple-500 bg-purple-500/5';
            case 'Annulée': return 'border-red-500/20 text-red-500 bg-red-500/5';
            default: return 'border-neutral-500/20 text-neutral-500 bg-neutral-500/5';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'Toutes' || order.status === filter;
        const matchesSearch = (order.user?.nom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.user?.prenom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-4">
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white mb-1.5">Commandes Clients</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">Suivez et gérez les commandes reçues pour vos produits</p>
            </div>

            <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] overflow-hidden shadow-soft transition-colors duration-300">
                <div className="p-4 border-b border-neutral-100 dark:border-[#1a1a1a] flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex gap-1.5">
                        {['Toutes', 'En attente', 'En préparation', 'Expédiée', 'Livrée'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === status ? 'bg-primary-600 text-white' : 'bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-neutral-100 dark:bg-[#1a1a1a] border-none rounded-lg py-1.5 pl-9 pr-4 text-xs text-neutral-900 dark:text-white focus:ring-1 focus:ring-primary-500 w-56 outline-none"
                        />
                        <svg className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="overflow-x-auto p-4">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] h-12">
                                <th className="px-6">Acheteur</th>
                                <th className="px-6">Produit(s)</th>
                                <th className="px-6">Montant (Vos articles)</th>
                                <th className="px-6">Date</th>
                                <th className="px-6">État</th>
                                <th className="px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? filteredOrders.map((order) => {
                                const vendorTotal = order.orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                                return (
                                    <tr key={order._id} className="bg-neutral-50/50 dark:bg-[#1a1a1a]/20 hover:bg-neutral-100 dark:hover:bg-[#1a1a1a]/40 transition-colors group">
                                        <td className="px-4 py-3 first:rounded-l-xl">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[9px] font-bold text-neutral-500">
                                                    {(order.user?.prenom?.[0] || '') + (order.user?.nom?.[0] || '')}
                                                </div>
                                                <span className="text-neutral-900 dark:text-white font-semibold text-xs">{order.user?.prenom} {order.user?.nom}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                                            {order.orderItems.length} article{order.orderItems.length > 1 ? 's' : ''}
                                        </td>
                                        <td className="px-4 py-3 text-xs font-black text-neutral-900 dark:text-white">{formatCurrency(vendorTotal)}</td>
                                        <td className="px-4 py-3 text-xs text-neutral-500 font-medium">{formatDate(order.createdAt)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest border transition-all ${getStatusStyle(order.status)}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 last:rounded-r-xl text-right">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className="bg-neutral-100 dark:bg-[#1a1a1a] text-[9px] font-bold py-1 px-2.5 rounded-md border-none focus:ring-1 focus:ring-primary-500 outline-none cursor-pointer"
                                            >
                                                <option value="En attente">Attente</option>
                                                <option value="En préparation">Préparation</option>
                                                <option value="Expédiée">Expédiée</option>
                                                <option value="Livrée">Livrée</option>
                                                <option value="Annulée">Annulée</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-neutral-500 text-sm italic">
                                        Aucune commande trouvée
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VendorOrders;
