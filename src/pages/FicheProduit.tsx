import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService, formatCurrency } from '../services/api';
import { Product } from '../types';

const FicheProduit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                if (!id) {
                    setError('Identifiant produit manquant');
                    return;
                }
                const response = await productService.getProductById(id);
                if (response && (response as any).data && (response as any).data.product) {
                    setProduct((response as any).data.product);
                } else if (response && (response as any).product) {
                    setProduct((response as any).product);
                } else if (response && (response as any).id) {
                    setProduct(response as any);
                } else {
                    setProduct(response.data as unknown as Product || response as any);
                }
            } catch (err) {
                console.error('Erreur chargement produit:', err);
                setError('Erreur lors du chargement du produit');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-amber-400' : 'text-gray-200 dark:text-neutral-800'}>
                ★
            </span>
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-black pt-32 flex justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full shadow-glow"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-black pt-40 text-center px-6">
                <div className="text-8xl mb-8">🍯</div>
                <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-6 italic">{error || 'Le produit s\'est évaporé'}</h2>
                <Link to="/produits" className="px-10 py-5 bg-primary-500 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-soft-orange hover:scale-105 transition-all inline-block">Retour à la boutique</Link>
            </div>
        );
    }

    const trustBadges = [
        { label: '100% Bio', icon: '🌿', description: 'Sans pesticides' },
        { label: 'Artisanal', icon: '🏺', description: 'Savoir-faire local' },
        { label: 'Équitable', icon: '🤝', description: 'Prix juste' },
        { label: 'Express', icon: '🚛', description: 'Livraison rapide' }
    ];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black font-inter pb-24 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-6 pt-24">
                {/* Breadcrumb Premium */}
                <nav className="mb-12">
                    <ol className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                        <li><Link to="/" className="hover:text-primary-500 transition-colors">Accueil</Link></li>
                        <span className="opacity-30">/</span>
                        <li><Link to="/produits" className="hover:text-primary-500 transition-colors">Catalogue</Link></li>
                        <span className="opacity-30">/</span>
                        <li className="text-neutral-900 dark:text-white truncate max-w-[150px]">{product.nom}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Galerie High-End */}
                    <div className="space-y-6">
                        <div className="relative aspect-square glass-card rounded-[3rem] overflow-hidden border border-white/20 dark:border-white/5 group shadow-2xl">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.nom}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-[120px] opacity-20">📦</div>
                            )}

                            {/* Region Flip Badge */}
                            <div className="absolute top-8 left-8">
                                <span className="bg-primary-500 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                    PROVENANCE : {product.region || 'GUINÉE'}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails Scroller */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-3xl overflow-hidden glass-card p-1 transition-all duration-500 border ${selectedImage === index
                                            ? 'border-primary-500 ring-2 ring-primary-500/20 scale-105'
                                            : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                                            }`}
                                    >
                                        <img src={image} alt="" className="w-full h-full object-cover rounded-2xl" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Informations Design Premium */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                                <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em]">{product.categorie || 'SÉLECTION PREMIUM'}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none italic">
                                {product.nom}
                            </h1>
                            <div className="flex items-center space-x-6 pb-2">
                                <div className="flex items-center">
                                    {renderStars(product.rating || 4.5)}
                                    <span className="ml-3 text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">
                                        12 Avis Clients
                                    </span>
                                </div>
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800"></span>
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest leading-none">
                                    En Stock
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-baseline space-x-4">
                                <span className="text-5xl font-black text-neutral-900 dark:text-white tracking-tighter">
                                    {formatCurrency(product.prix)}
                                </span>
                                {product.ancienPrix && product.ancienPrix > product.prix && (
                                    <span className="text-xl text-neutral-400 line-through font-bold opacity-50">
                                        {formatCurrency(product.ancienPrix)}
                                    </span>
                                )}
                            </div>

                            <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-xl">
                                {product.descriptionCourte || product.description}
                            </p>
                        </div>

                        {/* Trust Badges Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {trustBadges.map((badge, i) => (
                                <div key={i} className="glass-card p-4 rounded-3xl text-center border border-white/10 group hover:bg-white dark:hover:bg-white/5 transition-all duration-500">
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-0.5">{badge.label}</p>
                                    <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-tighter">{badge.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Storytelling Producteur */}
                        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden border border-primary-500/10">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/5 to-transparent pointer-events-none"></div>
                            <div className="flex items-center space-x-6 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-primary-500 overflow-hidden shadow-lg border-2 border-white dark:border-white/10">
                                    <img src={(product.vendeur as any)?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} alt="Producteur" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1 italic">Récit du producteur</p>
                                    <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight">{(product.vendeur as any)?.boutiqueNom || 'Coopérative Familiale'}</h3>
                                    <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Savoir-faire transmis depuis 1984</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions Premium */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-2xl border border-neutral-200 dark:border-white/10 h-16">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 text-xl font-bold dark:text-white transition-all active:scale-95"
                                >-</button>
                                <span className="w-10 text-center text-lg font-black dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 text-xl font-bold dark:text-white transition-all active:scale-95"
                                >+</button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 h-16 bg-primary-500 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-soft-orange hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3"
                                disabled={product.stock === 0}
                            >
                                <span className="text-xl">🛒</span>
                                <span>{product.stock === 0 ? 'RUPTURE DE STOCK' : 'AJOUTER AU PANIER'}</span>
                            </button>

                            <button
                                onClick={() => addToCart(product, quantity)}
                                className="h-16 w-16 bg-[#25D366] text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-green-500/20 hover:scale-110 hover:-rotate-6 transition-all"
                                title="Acheter via WhatsApp"
                            >
                                <span className="text-4xl">💬</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Long Story Section */}
                <div className="mt-24 border-t border-neutral-100 dark:border-white/5 pt-16">
                    <div className="max-w-3xl">
                        <h2 className="text-[12px] font-black text-primary-500 uppercase tracking-[0.4em] mb-8 flex items-center">
                            <span className="w-12 h-[2px] bg-primary-500 mr-4"></span>
                            HISTOIRE ET PRÉPARATION
                        </h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium italic mb-10 border-l-4 border-primary-500 pl-8">
                                "Chaque produit sur GuinéeMakiti porte en lui les battements de cœur d'une terre généreuse et les mains courageuses de nos paysans."
                            </p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                                {(product as any).descriptionLongue || product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FicheProduit;
