import React, { useState, useEffect } from 'react';
import { orderService, formatCurrency } from '../../services/api';

const VendorStats = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await orderService.getVendorStats();
                setStats(response.data);
            } catch (error) {
                console.error('Erreur chargement stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
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
            <div className="mb-4">
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white mb-1.5">Statistiques de Vente</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">Analysez la performance de votre boutique en temps réel</p>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-[#0a0a0a] rounded-xl p-5 border border-neutral-200 dark:border-[#1a1a1a] shadow-soft transition-all hover:border-[#f27405]/30">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-white/5 rounded-xl flex items-center justify-center mb-3 border border-neutral-200 dark:border-white/10">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Revenu Total</p>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white">{formatCurrency(stats?.totalRevenue || 0)}</h3>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] rounded-xl p-5 border border-neutral-200 dark:border-[#1a1a1a] shadow-soft transition-all hover:border-blue-500/20">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-white/5 rounded-xl flex items-center justify-center mb-3 border border-neutral-200 dark:border-white/10">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Produits Vendus</p>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white">{stats?.totalSales || 0}</h3>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] rounded-xl p-5 border border-neutral-200 dark:border-[#1a1a1a] shadow-soft transition-all hover:border-yellow-500/20">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-white/5 rounded-xl flex items-center justify-center mb-3 border border-neutral-200 dark:border-white/10">
                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Attente</p>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white">{stats?.pendingOrdersCount || 0}</h3>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] rounded-xl p-5 border border-neutral-200 dark:border-[#1a1a1a] shadow-soft transition-all hover:border-red-500/20">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-white/5 rounded-xl flex items-center justify-center mb-3 border border-neutral-200 dark:border-white/10">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Rupture</p>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white">{stats?.lowStockProducts || 0}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Evolution Revenue */}
                <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 border border-neutral-200 dark:border-[#1a1a1a] shadow-soft">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-6">Évolution du Revenu</h3>
                    <div className="h-48 flex items-end justify-between gap-1.5">
                        {stats?.monthlyStats?.map((month, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                                <div
                                    className="w-full bg-orange-500 rounded-t-lg transition-all duration-1000 opacity-80"
                                    style={{ height: `${(month.revenue / Math.max(...stats.monthlyStats.map(m => m.revenue), 1)) * 100}%` }}
                                ></div>
                                <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-tighter">M{month._id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-[#f27405] rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-center">
                    <div className="relative z-10 text-center lg:text-left">
                        <h3 className="text-xl font-black mb-2">Besoin de booster vos ventes ?</h3>
                        <p className="text-white/80 mb-4 text-xs max-w-sm mx-auto lg:mx-0">Partagez votre boutique ou améliorez vos photos produits.</p>
                        <button className="bg-white text-[#f27405] px-4 py-2 rounded-xl font-black text-xs hover:scale-105 transition-transform shadow-xl">
                            Voir mes conseils
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default VendorStats;
