import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @ts-ignore
import { orderService, formatCurrency, formatDate } from '../../services/api';
import { Order, OrderItem } from '../../types';

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await orderService.getOrderById(id);
                setOrder(response.data);
            } catch (err) {
                console.error('Erreur chargement commande:', err);
                setError('Impossible de récupérer les détails de la commande.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="text-center py-20 px-8">
                <div className="text-6xl mb-6">⚠️</div>
                <h2 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-4">
                    Oups! Commande introuvable
                </h2>
                <p className="text-xs text-neutral-500 mb-8 max-w-md mx-auto">
                    {error || "Nous ne parvenons pas à afficher les détails de cette commande pour le moment."}
                </p>
                <button
                    onClick={() => navigate('/commandes')}
                    className="bg-primary-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-soft-orange"
                >
                    Retour à mes achats
                </button>
            </div>
        );
    }

    const getStatusStep = (status: string) => {
        const steps = ['processing', 'shipped', 'delivered'];
        const currentStep = steps.indexOf(status.toLowerCase());
        return currentStep === -1 ? 0 : currentStep;
    };

    const steps = [
        { id: 'processing', label: 'Traitement', icon: '⚙️' },
        { id: 'shipped', label: 'Expédiée', icon: '🚚' },
        { id: 'delivered', label: 'Livrée', icon: '🎁' }
    ];

    const currentStepIndex = getStatusStep(order.status);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16 pt-4">
            {/* Back Button */}
            <div className="mb-6 animate-fade-in">
                <button
                    onClick={() => navigate('/commandes')}
                    className="group flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-primary-500 transition-all"
                >
                    <span className="h-8 w-8 rounded-full border border-neutral-200 dark:border-[#1a1a1a] flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:text-white transition-all">←</span>
                    <span>Retour à Mes Achats</span>
                </button>
            </div>

            {/* Main Header Card */}
            <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-[#1a1a1a] overflow-hidden shadow-soft-xl">
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div>
                            <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em] mb-3">Récapitulatif de Commande</p>
                            <h1 className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none">
                                #CMD-{order._id.slice(-8).toUpperCase()}
                            </h1>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-4">
                                Confirmée le {formatDate(order.createdAt)}
                            </p>
                        </div>
                        <div className="text-left md:text-right">
                            <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-neutral-100 dark:bg-[#111111] text-neutral-900 dark:text-white border border-neutral-200 dark:border-[#252525]`}>
                                {order.status}
                            </span>
                        </div>
                    </div>

                    {/* Visual Tracking Timeline */}
                    <div className="relative py-12 px-4 mb-8">
                        <div className="absolute top-[4.5rem] left-0 w-full h-[2px] bg-neutral-100 dark:bg-[#1a1a1a]"></div>
                        <div
                            className="absolute top-[4.5rem] left-0 h-[2px] bg-primary-500 transition-all duration-1000 ease-out shadow-soft-orange"
                            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        ></div>

                        <div className="relative flex justify-between">
                            {steps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex;
                                const isCurrent = index === currentStepIndex;

                                return (
                                    <div key={step.id} className="flex flex-col items-center text-center group">
                                        <div className={`
                      h-12 w-12 rounded-2xl flex items-center justify-center text-xl z-10 transition-all duration-500 mb-4
                      ${isCompleted ? 'bg-primary-500 text-white shadow-soft-orange' : 'bg-white dark:bg-[#0a0a0a] border-2 border-neutral-100 dark:border-[#1a1a1a] text-neutral-400'}
                      ${isCurrent ? 'scale-125' : 'scale-100'}
                    `}>
                                            {step.icon}
                                        </div>
                                        <p className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isCompleted ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
                                            {step.label}
                                        </p>
                                        {isCurrent && (
                                            <div className="mt-2 text-[8px] font-bold text-primary-500 uppercase animate-pulse">En cours</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Order Items Table */}
                <div className="border-t border-neutral-100 dark:border-[#111111]">
                    <div className="p-8 md:p-12">
                        <h2 className="text-[12px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-8">Articles Commandés</h2>
                        <div className="space-y-6">
                            {order.orderItems?.map((item: any, index: number) => (
                                <div key={index} className="flex items-center space-x-6 pb-6 border-b border-neutral-50 dark:border-[#0f0f0f] last:border-0 last:pb-0">
                                    <div className="h-20 w-20 bg-neutral-50 dark:bg-[#080808] rounded-2xl overflow-hidden shrink-0 border border-neutral-100 dark:border-[#151515]">
                                        <div className="w-full h-full flex items-center justify-center text-3xl opacity-50 grayscale">
                                            📦
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-1">
                                            {item.nom || item.product?.nom || 'Produit'}
                                        </h4>
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                            Quantité: {item.quantity} × {formatCurrency(item.prix || item.product?.prix || 0)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-neutral-900 dark:text-white tabular-nums">
                                            {formatCurrency((item.prix || item.product?.prix || 0) * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Billing Summary */}
                        <div className="mt-12 pt-8 border-t-2 border-dashed border-neutral-100 dark:border-[#1a1a1a] flex justify-end">
                            <div className="w-full max-w-xs space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                    <span>Sous-total</span>
                                    <span className="text-neutral-900 dark:text-white tabular-nums">{formatCurrency(order.totalPrice - (order.shippingPrice || 0))}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                    <span>Livraison</span>
                                    <span className="text-neutral-900 dark:text-white tabular-nums">{formatCurrency(order.shippingPrice || 0)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-neutral-100 dark:border-[#111111]">
                                    <span className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-[0.2em]">Total</span>
                                    <span className="text-2xl font-black text-primary-500 tabular-nums tracking-tighter">{formatCurrency(order.totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping Info */}
                <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-[#1a1a1a] p-8 md:p-10">
                    <h2 className="text-[11px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center">
                        <span className="mr-3">📍</span> Adresse de Livraison
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Livré à</p>
                            <p className="text-sm font-bold text-neutral-900 dark:text-white">{order.shippingAddress?.prenom} {order.shippingAddress?.nom}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Localisation</p>
                            <p className="text-sm font-bold text-neutral-900 dark:text-white">{order.shippingAddress?.rue}</p>
                            <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-tighter mt-1">
                                {order.shippingAddress?.ville}, {order.shippingAddress?.pays}
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Contact</p>
                            <p className="text-sm font-bold text-neutral-900 dark:text-white">{order.user?.telephone || 'Numéro non fourni'}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="bg-neutral-900 dark:bg-[#0a0a0a] rounded-3xl border border-neutral-800 dark:border-[#1a1a1a] p-8 md:p-10 text-white">
                    <h2 className="text-[11px] font-black text-primary-400 uppercase tracking-[0.3em] mb-6 flex items-center">
                        <span className="mr-3 text-white">💳</span> Détails du Paiement
                    </h2>
                    <div className="space-y-6">
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-3">Méthode Utilisée</p>
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center text-xl">📱</div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tight">{order.paymentMethod || 'Orange Money'}</p>
                                    <p className="text-[9px] text-white/50 font-medium">Paiement Mobile Sécurisé</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-2">
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Transaction ID</p>
                            <p className="text-[10px] font-mono text-white/80">{order.paymentResult?.id || 'TXN-' + order._id.slice(0, 10).toUpperCase()}</p>
                        </div>
                        <div className="px-2">
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Statut du Paiement</p>
                            <div className="flex items-center space-x-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-green-500">Succès</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Quick Link */}
            <div className="bg-primary-500 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-orange overflow-hidden relative group">
                <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 group-hover:rotate-12 transition-transform duration-700">💬</div>
                <div className="relative z-10 text-center md:text-left">
                    <h2 className="text-xl font-black uppercase tracking-tighter mb-2">Un problème avec votre commande ?</h2>
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Nos experts sont disponibles 24/7 pour vous assister.</p>
                </div>
                <button
                    onClick={() => navigate('/support')}
                    className="relative z-10 bg-white text-primary-500 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
                >
                    Ouvrir un ticket
                </button>
            </div>
        </div>
    );
};

export default OrderDetail;


