import React from 'react';
import { formatCurrency } from '../../services/api';

const OrderTable = ({ orders, onViewDetail }) => {
    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'LIVRÉ': return 'border-green-500/20 text-green-500 bg-green-500/5';
            case 'EN ATTENTE': return 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5';
            case 'EN COURS': return 'border-blue-500/20 text-blue-500 bg-blue-500/5';
            case 'ANNULÉ': return 'border-red-500/20 text-red-500 bg-red-500/5';
            default: return 'border-neutral-500/20 text-neutral-500 bg-neutral-500/5';
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                    <tr className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] h-12">
                        <th className="px-6 text-center">Réf.</th>
                        <th className="px-6">Client</th>
                        <th className="px-6">Montant</th>
                        <th className="px-6">Date</th>
                        <th className="px-6">État</th>
                        <th className="px-6 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id || order._id} className="bg-[#2d241e]/20 hover:bg-[#2d241e]/40 transition-colors group">
                            <td className="px-6 py-5 first:rounded-l-[24px] text-sm font-bold text-primary-500 text-center">
                                #{order.id || (order._id && order._id.slice(-6).toUpperCase())}
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-400">
                                        {order.client?.split(' ').map(n => n[0]).join('') || 'U'}
                                    </div>
                                    <span className="text-white font-semibold text-sm">{order.client || 'Client Anonyme'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-sm font-black text-white">{formatCurrency(order.amount || order.totalPrice)}</td>
                            <td className="px-6 py-5 text-sm text-neutral-500 font-medium">{order.date || new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-5">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border transition-all ${getStatusStyle(order.status)}`}>
                                    {order.status || 'INCONNU'}
                                </span>
                            </td>
                            <td className="px-6 py-5 last:rounded-r-[24px] text-right">
                                <button
                                    onClick={() => onViewDetail && onViewDetail(order.id || order._id)}
                                    className="p-2 bg-[#1a1512] text-neutral-400 hover:text-primary-500 hover:bg-neutral-800 rounded-xl transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
