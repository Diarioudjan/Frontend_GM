import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productService, formatCurrency } from '../services/api';
import { Product } from '../types';

const FicheProduit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth() as { isAuthenticated: boolean };
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

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

    const handleAddToCart = async () => {
        if (product) {
            await addToCart(product, quantity);
        }
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-orange-500' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    // Si un client connecté ouvre /produit/:id, on le garde dans le layout client.
    if (isAuthenticated && id && location.pathname.startsWith('/produit/')) {
        return <Navigate to={`/catalogue-client/produit/${id}`} replace />;
    }

    const catalogPath = isAuthenticated ? '/catalogue-client' : '/produits';
    const homePath = isAuthenticated ? '/dashboard' : '/';
    const getProductPath = (productId?: string) =>
        isAuthenticated ? `/catalogue-client/produit/${productId}` : `/produit/${productId}`;
    const mockSimilarProducts: Product[] = [
        {
            id: 'mock-1',
            nom: 'Mangues Bio de Kindia',
            description: 'Fruits frais et sucres',
            prix: 28000,
            categorie: 'Alimentation',
            region: 'Basse Guinee',
            stock: 20,
            images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80']
        },
        {
            id: 'mock-2',
            nom: 'Miel Naturel de Labe',
            description: 'Recolte artisanale locale',
            prix: 45000,
            categorie: 'Alimentation',
            region: 'Moyenne Guinee',
            stock: 15,
            images: ['https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80']
        },
        {
            id: 'mock-3',
            nom: 'Savon Noir Traditionnel',
            description: 'Fabrication artisanale',
            prix: 22000,
            categorie: 'Cosmétique',
            region: 'Conakry',
            stock: 30,
            images: ['https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=800&q=80']
        },
        {
            id: 'mock-4',
            nom: 'Piment Seche Premium',
            description: 'Saveur authentique de Guinee',
            prix: 18000,
            categorie: 'Alimentation',
            region: 'Haute Guinee',
            stock: 40,
            images: ['https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80']
        }
    ];

    useEffect(() => {
        const loadSimilarProducts = async () => {
            if (!product) return;
            try {
                const response = await productService.getAllProducts();
                const list: Product[] = response?.data?.products || [];
                const currentId = product._id || product.id;
                const related = list
                    .filter((p) => (p._id || p.id) !== currentId)
                    .filter((p) => p.categorie === product.categorie || p.region === product.region)
                    .slice(0, 4);

                // Fallback: s'il n'y a pas assez de produits "similaires",
                // on complète avec d'autres produits pour toujours afficher la section.
                if (related.length > 0) {
                    setSimilarProducts(related);
                } else {
                    const fallbackApiProducts = list
                        .filter((p) => (p._id || p.id) !== currentId)
                        .slice(0, 4);

                    if (fallbackApiProducts.length > 0) {
                        setSimilarProducts(fallbackApiProducts);
                    } else {
                        setSimilarProducts(mockSimilarProducts);
                    }
                }
            } catch (err) {
                console.error('Erreur chargement produits similaires:', err);
                setSimilarProducts(mockSimilarProducts);
            }
        };

        loadSimilarProducts();
    }, [product]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-orange-600/20 border-t-orange-600 rounded-full animate-spin"></div>
                    <span className="text-neutral-400 text-xs font-medium tracking-widest uppercase">Chargement</span>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white pt-40 flex flex-col items-center px-6">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-4xl mb-6">🔍</div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">{error || 'Produit introuvable'}</h2>
                <p className="text-neutral-500 text-sm mb-8">Nous n'avons pas pu trouver la page que vous recherchez.</p>
                <Link to={catalogPath} className="px-8 py-3 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">Découvrir le catalogue</Link>
            </div>
        );
    }

    const trustBadges = [
        { label: 'Bio certifie', icon: '🌿' },
        { label: 'Artisanal', icon: '🏺' },
        { label: 'Paiement securise', icon: '🔒' },
        { label: 'Livraison rapide', icon: '🚚' }
    ];
    const productDescription =
        (product as any).descriptionLongue ||
        product.description ||
        product.descriptionCourte ||
        "Produit local de qualite, soigneusement selectionne aupres de producteurs guineens.";
    const showDescriptionToggle = productDescription.length > 180;

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#050505] font-sans text-neutral-900 dark:text-neutral-100 pt-4">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <nav className="mb-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                    <Link to={homePath} className="hover:text-neutral-700 dark:hover:text-white transition-colors">Accueil</Link>
                    <span>/</span>
                    <Link to={catalogPath} className="hover:text-neutral-700 dark:hover:text-white transition-colors">Catalogue</Link>
                    <span>/</span>
                    <span className="text-neutral-700 dark:text-neutral-200 truncate max-w-[180px] sm:max-w-[280px]">{product.nom}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="relative group rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] shadow-sm">
                            <div className="aspect-[4/3] md:aspect-[16/11]">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[selectedImage]}
                                        alt={product.nom}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1615485242232-2be517b649d2?auto=format&fit=crop&q=80&w=1200';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl text-neutral-300 dark:text-neutral-700">📦</div>
                                )}
                            </div>

                            {product.images && product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-black/70 rounded-full flex items-center justify-center text-neutral-800 dark:text-neutral-100 shadow-md hover:bg-orange-500 hover:text-white transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button
                                        onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-black/70 rounded-full flex items-center justify-center text-neutral-800 dark:text-neutral-100 shadow-md hover:bg-orange-500 hover:text-white transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </>
                            )}

                            <div className="absolute left-4 top-4 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/70 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Origine</p>
                                <p className="text-[11px] font-black uppercase tracking-wide">{product.region || 'Guinee'}</p>
                            </div>
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                                            selectedImage === idx ? 'border-orange-500' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-24 space-y-5">
                            <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-300 text-[10px] font-black uppercase tracking-widest">
                                        {product.categorie || 'Selection'}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
                                    {product.nom}
                                </h1>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-0.5">{renderStars(product.rating || 5)}</div>
                                    <span className="text-xs text-neutral-500">12 avis verifies</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">En stock</span>
                                </div>

                                <div className="flex items-end gap-3 mb-5">
                                    <span className="text-4xl font-black tracking-tighter text-neutral-900 dark:text-white">
                                        {formatCurrency(product.prix)}
                                    </span>
                                    {product.ancienPrix && product.ancienPrix > product.prix && (
                                        <span className="text-lg text-neutral-400 line-through">
                                            {formatCurrency(product.ancienPrix)}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <p className={`text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                                        {productDescription}
                                    </p>
                                    {showDescriptionToggle && (
                                        <button
                                            onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                                            className="mt-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                                        >
                                            {isDescriptionExpanded ? 'Voir moins' : 'Voir plus'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
                                <div className="grid grid-cols-4 gap-2 pb-5 mb-5 border-b border-neutral-100 dark:border-neutral-800">
                                    {trustBadges.map((badge, i) => (
                                        <div key={i} className="text-center">
                                            <span className="text-xl">{badge.icon}</span>
                                            <p className="text-[10px] mt-1 font-bold text-neutral-500 dark:text-neutral-400">{badge.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-1">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 rounded-lg text-lg font-bold hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                                            >
                                                −
                                            </button>
                                            <span className="w-10 text-center font-black">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 rounded-lg text-lg font-bold hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                            className="flex-1 h-12 rounded-xl bg-neutral-900 dark:bg-orange-500 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                                        </button>
                                    </div>

                                    <button className="w-full h-12 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md">
                                        Commander
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 flex items-center gap-4">
                                <img
                                    src={(product.vendeur as any)?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
                                    alt="Producteur"
                                />
                                <div>
                                    <p className="text-[10px] font-black text-orange-600 dark:text-orange-300 uppercase tracking-widest mb-1">
                                        Vendeur
                                    </p>
                                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                                        {(product.vendeur as any)?.boutiqueNom || 'Boutique locale'}
                                    </h4>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        Producteur verifie de la plateforme
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {similarProducts.length > 0 && (
                    <section className="mt-12 bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl md:text-2xl font-black tracking-tight">Produits similaires</h2>
                            <Link
                                to={catalogPath}
                                className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                            >
                                Voir plus
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {similarProducts.map((item) => (
                                <Link
                                    key={item._id || item.id}
                                    to={getProductPath(item._id || item.id)}
                                    className="group bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-primary-400/40 transition-all"
                                >
                                    <div className="h-36 bg-neutral-100 dark:bg-neutral-800">
                                        {item.images?.[0] ? (
                                            <img
                                                src={item.images[0]}
                                                alt={item.nom}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-400">📦</div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-[10px] text-primary-500 font-semibold mb-1 truncate">
                                            {item.categorie || 'Produit local'}
                                        </p>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                                            {item.nom}
                                        </h3>
                                        <p className="text-sm font-black text-neutral-900 dark:text-white mt-2">
                                            {formatCurrency(item.prix)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default FicheProduit;
