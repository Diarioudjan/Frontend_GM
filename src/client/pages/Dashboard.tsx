import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { productService, orderService } from '../../services/api';
import { User, Product, Order } from '../../types';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import { motion } from 'framer-motion';
import { FiPackage, FiHeart, FiSettings, FiArrowRight, FiShield } from 'react-icons/fi';

const Dashboard: React.FC = () => {
    const { user, isAuthenticated } = useAuth() as { user: User | null; isAuthenticated: boolean };
    const navigate = useNavigate();
    
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/connexion');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Fetch some products for "Recommandés pour vous"
                const productsRes = await productService.getAllProducts({ limit: 4 });
                if (productsRes.data && productsRes.data.products) {
                    setRecommendedProducts(productsRes.data.products);
                }

                // Fetch orders for the bottom section
                const ordersRes = await orderService.getUserOrders();
                if (ordersRes.data && ordersRes.data.orders) {
                    setRecentOrders(ordersRes.data.orders.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return (
        <div className="bg-neutral-50 dark:bg-[#050505] min-h-screen font-inter transition-colors duration-500">
            {/* Main Content Hub */}
            <main className="max-w-[1280px] mx-auto px-4 sm:px-5 lg:px-6 pt-4 pb-16">
                
                {/* Header Welcome Section */}
                <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-lg shadow-inner shadow-primary-500/10">👋</span>
                            <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em]">Tableau de Bord Client</span>
                        </motion.div>
                        <h1 className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none mb-1">
                            Content de vous revoir, <span className="text-primary-600">{user?.prenom}</span>
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs font-medium">
                            Explorez les nouveautés et suivez vos pépites préférées.
                        </p>
                    </div>

                    {/* Quick Access Pills */}
                    <div className="flex flex-wrap gap-3">
                        <Link to="/favoris" className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:text-orange-500 transition-all text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                            <FiHeart className="text-orange-500" /> Mes Envies
                        </Link>
                        <Link to="/commandes" className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:text-primary-600 transition-all text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                            <FiPackage className="text-primary-600" /> Commandes
                        </Link>
                        <Link to="/profile" className="p-2.5 bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:text-primary-600 transition-all">
                            <FiSettings size={18} />
                        </Link>
                    </div>
                </header>

                {/* Promotional Hero Section */}
                <Banner />

                {/* Product Section 1: Recommendations */}
                <section className="mt-12">
                    <ProductList 
                        products={recommendedProducts} 
                        title="Recommandés pour vous" 
                        subtitle="Pépites Locales"
                        layout="grid"
                        loading={loading}
                    />
                    <div className="flex justify-center mt-5">
                        <Link to="/catalogue-client" className="group flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-black uppercase tracking-[0.15em] text-[10px] shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 active:scale-95 transition-all">
                            Voir tout le catalogue <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </section>

                {/* Account Overview Cards (Minimalist replacements for heavy sidebar) */}
                <section className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Recent Orders Insight */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">Dernières Activités</h3>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Vos transactions récentes</p>
                            </div>
                            <Link to="/commandes" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Voir historique</Link>
                        </div>

                        <div className="space-y-4">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-[#111] rounded-xl border border-neutral-200/70 dark:border-neutral-800 hover:border-primary-500/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 bg-white dark:bg-black rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">🛍️</div>
                                            <div>
                                                <p className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-tight">Commande #{order._id?.slice(-6)}</p>
                                                <p className="text-[10px] font-medium text-neutral-400">Le {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-primary-600">{order.totalPrice || order.total} GNF</p>
                                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600">{order.status}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 opacity-30 uppercase text-[9px] font-black tracking-widest">Aucune commande à afficher</div>
                            )}
                        </div>
                    </div>

                    {/* Support & Tips Card */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-primary-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-primary-500/20 relative overflow-hidden group">
                           <div className="relative z-10">
                                <span className="p-2 bg-white/20 rounded-xl mb-6 inline-block backdrop-blur-md border border-white/20">
                                    <FiShield size={24} />
                                </span>
                                <h4 className="text-xl font-black mb-3 leading-tight tracking-tight">Paiement 100% sécurisé</h4>
                                <p className="text-sm text-white/80 font-medium mb-6 leading-relaxed">
                                    Votre sécurité est notre priorité. Tous vos achats sur Guinée Makiti sont protégés.
                                </p>
                                <button className="w-full py-3 bg-white text-primary-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                                    En savoir plus
                                </button>
                           </div>
                           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
                        </div>

                        {/* Customer Support Small Card */}
                        <div className="bg-neutral-900 dark:bg-neutral-800 rounded-2xl p-6 text-white">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-6">Support Client 24/7</h4>
                            <p className="text-lg font-black mb-6 leading-tight">Besoin d'aide pour une livraison ?</p>
                            <Link to="/contact" className="flex items-center justify-between group">
                                <span className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-8 group-hover:text-orange-400 transition-colors">Contacter nous</span>
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">→</div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
};

export default Dashboard;




