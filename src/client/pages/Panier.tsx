import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../services/api';
import { CartItem } from '../../types';

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
                    <div className="text-[90px] relative z-10 animate-bounce-gentle">🛒</div>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mb-6">Votre panier est vide</h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm mb-12 leading-relaxed">
                    Il est temps de récolter les merveilles de nos régions. Explorez notre catalogue et remplissez votre panier.
                </p>
                <Link to="/catalogue-client" className="bg-primary-500 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-soft-orange hover:scale-105 transition-all active:scale-95">
                    Retourner au catalogue
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#050505] font-inter pt-4 pb-12 px-3 sm:px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-6">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-2">
                        <span className="text-[11px] font-bold text-primary-600">Sélection ({cartItems.length})</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-none">
                        Mon <span className="text-primary-500">panier</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3.5 gap-4 xl:gap-6 items-start">
                    {/* Items List */}
                    <div className="xl:col-span-2 space-y-2">
                        <div className="space-y-2">
                            {cartItems.map((item: CartItem, index) => {
                                const product = item.product;
                                const productId = product._id || product.id || String(index);
                                return (
                                    <div key={productId} className="bg-white dark:bg-[#0a0a0a] p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 group hover:shadow-md transition-all duration-300 flex items-center gap-2.5">
                                        {/* Product Image */}
                                        <div className="h-16 w-16 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0 group-hover:scale-105 transition-transform duration-300">
                                            <img src={product.images?.[0] || ''} alt={product.nom} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-semibold text-primary-500 leading-none mb-1 truncate">{product.categorie || 'Guinée'}</p>
                                                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight leading-tight truncate">{product.nom}</h3>
                                                    <p className="text-[11px] text-neutral-500 mt-0.5 truncate">Producteur : <span className="text-neutral-900 dark:text-neutral-300 font-medium">{(product.vendeur as any)?.boutiqueNom || 'Coopérative'}</span></p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-base font-black text-neutral-900 dark:text-white tabular-nums tracking-tighter">
                                                        {formatCurrency(product.prix * item.quantity)}
                                                    </p>
                                                    <p className="text-[10px] text-neutral-400 mt-0.5">
                                                        {formatCurrency(product.prix)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-2 flex items-center justify-between">
                                                <div className="flex items-center glass-effect bg-white/50 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 p-0.5">
                                                    <button
                                                        onClick={() => updateQuantity(productId, Math.max(1, item.quantity - 1))}
                                                        className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors text-sm font-bold"
                                                    >−</button>
                                                    <span className="w-8 text-center text-xs font-black dark:text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(productId, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors text-sm font-bold"
                                                    >+</button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(productId)}
                                                    className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 underline underline-offset-4 transition-all"
                                                >Retirer</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                    {/* Order Summary */}
                    <aside className="space-y-3 sticky top-20">
                        <div className="bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <h2 className="text-xs font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
                                <span className="w-5 h-[1.5px] bg-primary-500 mr-2"></span>
                                Résumé
                            </h2>

                            <div className="space-y-2.5 mb-6">
                                <div className="flex justify-between items-center text-xs font-semibold text-neutral-500">
                                    <span>Sous-total</span>
                                    <span className="text-neutral-900 dark:text-white tabular-nums">{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-semibold text-neutral-500">
                                    <span>Expédition</span>
                                    <span className="text-neutral-900 dark:text-white tabular-nums">{shipping === 0 ? 'Offerte' : formatCurrency(shipping)}</span>
                                </div>

                                {shipping > 0 && (
                                    <div className="p-2 rounded-lg bg-primary-500/5 border border-primary-500/10">
                                        <p className="text-[11px] font-semibold text-primary-600 leading-tight">
                                            💡 Ajoutez {formatCurrency(500000 - cartTotal)} pour la livraison gratuite.
                                        </p>
                                    </div>
                                )}

                                <div className="pt-2.5 border-t border-neutral-100 dark:border-white/5">
                                    <div className="flex justify-between items-end mb-1.5">
                                        <span className="text-sm font-bold text-neutral-900 dark:text-white">Total</span>
                                        <span className="text-xl font-black text-primary-500 tabular-nums tracking-tighter leading-none">{formatCurrency(total)}</span>
                                    </div>
                                    <p className="text-[10px] text-neutral-400 mt-2 opacity-70">Paiement sécurisé.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => navigate('/paiement')}
                                    className="w-full bg-primary-500 text-white rounded-lg py-2.5 text-sm font-bold shadow-soft-orange hover:scale-105 active:scale-95 transition-all outline-none"
                                >
                                    Payer
                                </button>
                                <Link
                                    to="/catalogue-client"
                                    className="w-full flex items-center justify-center py-2 text-xs font-semibold text-neutral-500 hover:text-primary-500 transition-all"
                                >
                                    Continuer mes achats
                                </Link>
                            </div>

                            {/* Trust Markers */}
                            <div className="mt-5 pt-3 border-t border-neutral-50 dark:border-white/5 grid grid-cols-3 gap-2">
                                {[
                                    { icon: '🛡️', label: 'SSL' },
                                    { icon: '🚛', label: 'Suivi' },
                                    { icon: '✨', label: 'Qualité' }
                                ].map((badge, i) => (
                                    <div key={i} className="text-center group transition-all">
                                        <span className="block text-lg mb-0.5 grayscale group-hover:grayscale-0 transition-all opacity-30 group-hover:opacity-100">{badge.icon}</span>
                                        <span className="text-[10px] font-semibold text-neutral-400">{badge.label}</span>
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



