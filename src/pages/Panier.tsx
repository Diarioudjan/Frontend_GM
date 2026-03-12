import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../services/api';
import { CartItem } from '../types';

const Panier: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const shipping = cartTotal > 500000 ? 0 : 25000;
    const total = cartTotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 px-8 flex flex-col items-center justify-center text-center font-inter">
                <div className="relative mb-12 group">
                    <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full scale-150 group-hover:bg-primary-500/30 transition-all duration-700"></div>
                    <div className="text-[120px] relative z-10 animate-bounce-gentle">🛒</div>
                </div>
                <h2 className="text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-6 italic">Votre panier est en jachère</h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm mb-12 uppercase font-black tracking-[0.2em] leading-relaxed">
                    Il est temps de récolter les merveilles de nos régions. Explorez notre catalogue et remplissez votre panier.
                </p>
                <Link to="/produits" className="bg-primary-500 text-white px-12 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-soft-orange hover:scale-105 transition-all active:scale-95">
                    RETOURNER AU CATALOGUE
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black font-inter pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
                        <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em]">VOTRE SÉLECTION ({cartItems.length} ARTICLES)</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter italic leading-none">
                        Mon <span className="text-primary-500 not-italic">Panier</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 items-start">
                    {/* Items List */}
                    <div className="xl:col-span-2 space-y-8">
                        <div className="space-y-6">
                            {cartItems.map((item: CartItem, index) => {
                                const product = item.product;
                                const productId = product._id || product.id || String(index);
                                return (
                                    <div key={productId} className="glass-card p-6 md:p-8 rounded-[2.5rem] border border-neutral-100 dark:border-white/5 group hover:shadow-2xl transition-all duration-700">
                                        <div className="flex flex-col md:flex-row items-center gap-10">
                                            {/* Product Image */}
                                            <div className="h-32 w-32 bg-neutral-100 dark:bg-white/5 rounded-3xl overflow-hidden border border-neutral-100 dark:border-white/5 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-700">
                                                <img src={product.images?.[0] || ''} alt={product.nom} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 text-center md:text-left space-y-2">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest leading-none mb-2">{product.categorie || 'GUINÉE'}</p>
                                                        <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight leading-none italic">{product.nom}</h3>
                                                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mt-2">Producteur : <span className="text-neutral-900 dark:text-neutral-300">{(product.vendeur as any)?.boutiqueNom || 'Coopérative Locale'}</span></p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums tracking-tighter">
                                                            {formatCurrency(product.prix * item.quantity)}
                                                        </p>
                                                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">
                                                            Prix unité : {formatCurrency(product.prix)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                                    <div className="flex items-center glass-effect bg-white/50 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/10 p-1">
                                                        <button
                                                            onClick={() => updateQuantity(productId, Math.max(1, item.quantity - 1))}
                                                            className="w-10 h-10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors text-xl font-bold"
                                                        >−</button>
                                                        <span className="w-12 text-center text-sm font-black dark:text-white">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(productId, item.quantity + 1)}
                                                            className="w-10 h-10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors text-xl font-bold"
                                                        >+</button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(productId)}
                                                        className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] hover:text-rose-600 underline underline-offset-8 transition-all"
                                                    >Retirer de la sélection</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* WhatsApp Support Banner */}
                        <div className="glass-card p-10 rounded-[3rem] bg-neutral-900 dark:bg-[#080808] text-white relative overflow-hidden group shadow-3xl">
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none"></div>
                            <div className="absolute right-10 bottom-0 text-[180px] opacity-5 -rotate-12 translate-y-1/4 group-hover:rotate-0 transition-transform duration-1000">💬</div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Besoin d'un accompagnement ?</h3>
                                    <p className="text-[11px] text-neutral-400 font-black uppercase tracking-[0.3em]">Conseils personnalisés et suivi en direct sur WhatsApp.</p>
                                </div>
                                <a href="https://wa.me/224620000000" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 hover:-rotate-2 transition-all active:scale-95 flex items-center">
                                    <span className="mr-4 text-2xl">💬</span> DISCUTER AVEC NOUS
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <aside className="space-y-8 sticky top-32">
                        <div className="glass-card p-10 rounded-[3rem] border border-white/10 shadow-3xl bg-white dark:bg-black/40">
                            <h2 className="text-[12px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.4em] mb-12 flex items-center">
                                <span className="w-10 h-[2px] bg-primary-500 mr-4"></span>
                                Résumé
                            </h2>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between items-center text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                                    <span>Sous-total</span>
                                    <span className="text-neutral-900 dark:text-white tabular-nums">{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                                    <span>Expédition</span>
                                    <span className="text-neutral-900 dark:text-white tabular-nums">{shipping === 0 ? 'Offerte' : formatCurrency(shipping)}</span>
                                </div>

                                {shipping > 0 && (
                                    <div className="p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10">
                                        <p className="text-[8px] font-black text-primary-500 uppercase tracking-widest leading-relaxed">
                                            💡 Ajoutez {formatCurrency(500000 - cartTotal)} de produits pour bénéficier de la livraison offerte.
                                        </p>
                                    </div>
                                )}

                                <div className="pt-8 border-t border-neutral-100 dark:border-white/5">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[12px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] pb-1">Total Final</span>
                                        <span className="text-4xl font-black text-primary-500 tabular-nums tracking-tighter leading-none">{formatCurrency(total)}</span>
                                    </div>
                                    <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest mt-4 opacity-50 italic">Frais de douane éventuels inclus. Paiement sécurisé.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => navigate('/paiement')}
                                    className="w-full h-18 bg-primary-500 text-white rounded-3xl py-6 text-[11px] font-black uppercase tracking-[0.3em] shadow-soft-orange hover:scale-105 active:scale-95 transition-all outline-none"
                                >
                                    PROCÉDER AU PAIEMENT
                                </button>
                                <Link
                                    to="/produits"
                                    className="w-full flex items-center justify-center py-4 text-[9px] font-black text-neutral-400 hover:text-primary-500 uppercase tracking-[0.3em] transition-all"
                                >
                                    CONTINUER L'EXPLORATION
                                </Link>
                            </div>

                            {/* Trust Markers */}
                            <div className="mt-12 pt-8 border-t border-neutral-50 dark:border-white/5 grid grid-cols-3 gap-4">
                                {[
                                    { icon: '🛡️', label: 'SSL' },
                                    { icon: '🚛', label: 'Suivi' },
                                    { icon: '✨', label: 'Luxe' }
                                ].map((badge, i) => (
                                    <div key={i} className="text-center group transition-all">
                                        <span className="block text-2xl mb-2 grayscale group-hover:grayscale-0 transition-all opacity-30 group-hover:opacity-100">{badge.icon}</span>
                                        <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Panier;
