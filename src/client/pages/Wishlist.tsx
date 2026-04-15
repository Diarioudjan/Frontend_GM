import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../services/api';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    originalPrice: number | null;
    image: string;
    category: string;
    inStock: boolean;
    rating: number;
    reviews: number;
    addedDate: string;
}

interface WishlistProps {
    isComponent?: boolean;
}

const Wishlist: React.FC<WishlistProps> = ({ isComponent = false }) => {
    const { addToCart } = useCart();
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Données de démonstration
    const demoWishlist: WishlistItem[] = [
        {
            id: 1,
            name: 'Masque traditionnel Baga',
            price: 75000,
            originalPrice: 85000,
            image: 'https://images.unsplash.com/photo-1594736797933-d0601ba2fe65?auto=format&fit=crop&w=800&q=80',
            category: 'Art traditionnel',
            inStock: true,
            rating: 4.8,
            reviews: 24,
            addedDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Sculpture en bois d\'ébène',
            price: 89000,
            originalPrice: null,
            image: 'https://images.unsplash.com/photo-1616627457739-6b8706f18f40?auto=format&fit=crop&w=800&q=80',
            category: 'Sculpture',
            inStock: true,
            rating: 4.9,
            reviews: 18,
            addedDate: '2024-01-10'
        },
        {
            id: 3,
            name: 'Collier en perles traditionnelles',
            price: 45000,
            originalPrice: 55000,
            image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
            category: 'Bijoux',
            inStock: false,
            rating: 4.7,
            reviews: 32,
            addedDate: '2024-01-08'
        },
        {
            id: 4,
            name: 'Tissu Kente authentique',
            price: 65000,
            originalPrice: null,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
            category: 'Textile',
            inStock: true,
            rating: 4.6,
            reviews: 15,
            addedDate: '2024-01-05'
        }
    ];

    useEffect(() => {
        // Simulation du chargement
        setTimeout(() => {
            setWishlistItems(demoWishlist);
            setLoading(false);
        }, 1000);
    }, []);

    const removeFromWishlist = (itemId: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleAddToCart = async (item: WishlistItem) => {
        await addToCart({
            id: String(item.id),
            nom: item.name,
            description: item.category,
            prix: item.price,
            categorie: item.category,
            region: 'Guinée',
            stock: item.inStock ? 10 : 0,
            images: [item.image]
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className={`${isComponent ? '' : 'min-h-screen bg-neutral-50 dark:bg-[#050505] pt-4 pb-8 font-inter'}`}>
            <div className={`${isComponent ? '' : 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
                {/* Header - only if not in dashboard */}
                {!isComponent && (
                    <div className="mb-8">
                        <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mb-2">
                            Ma Liste de Souhaits
                        </h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {wishlistItems.length} produit{wishlistItems.length > 1 ? 's' : ''} dans votre liste de souhaits
                        </p>
                    </div>
                )}

                {wishlistItems.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] p-12 text-center shadow-soft">
                        <div className="text-neutral-300 dark:text-neutral-700 text-6xl mb-4">💝</div>
                        <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-2 uppercase tracking-tight">
                            Votre liste de souhaits est vide
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 max-w-xs mx-auto">
                            Parcourez nos produits et ajoutez vos favoris à votre liste de souhaits
                        </p>
                        <button className="bg-primary-500 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary-600 transition-all transform hover:scale-105">
                            Découvrir nos produits
                        </button>
                    </div>
                ) : (
                    /* Wishlist Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden border border-neutral-200 dark:border-[#1a1a1a] group hover:border-primary-500/30 transition-all duration-500 shadow-sm hover:shadow-lg">
                                {/* Product Image */}
                                <div className="relative h-48 bg-neutral-100 dark:bg-[#080808] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {!item.inStock && (
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                                                Epuisé
                                            </span>
                                        </div>
                                    )}
                                    {item.originalPrice && (
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary-500 text-white px-3 py-1 rounded-2xl text-[9px] font-black uppercase tracking-tighter shadow-soft-orange">
                                                -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                                            </span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl shadow-xl text-red-500 hover:scale-110 transition-transform"
                                    >
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.16em]">
                                            {item.category}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-black text-neutral-900 dark:text-white mb-4 line-clamp-1 tracking-tight">
                                        {item.name}
                                    </h3>

                                    {/* Price & Rating Row */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-xl font-black text-neutral-900 dark:text-white tabular-nums tracking-tighter">
                                                {item.price.toLocaleString()} <span className="text-xs text-primary-500 ml-0.5">GNF</span>
                                            </span>
                                            {item.originalPrice && (
                                                <span className="text-[10px] text-neutral-400 dark:text-neutral-600 line-through tabular-nums">
                                                    {item.originalPrice.toLocaleString()} GNF
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center bg-neutral-50 dark:bg-[#111111] px-3 py-1.5 rounded-xl border border-neutral-100 dark:border-[#1a1a1a]">
                                            <span className="text-yellow-400 text-sm mr-1.5">★</span>
                                            <span className="text-[10px] font-black text-neutral-900 dark:text-white">{item.rating}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            disabled={!item.inStock}
                                            className={`py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${item.inStock
                                                ? 'bg-primary-500 text-white shadow-soft-orange hover:scale-105 active:scale-95'
                                                : 'bg-neutral-100 dark:bg-[#151515] text-neutral-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {item.inStock ? 'Ajouter' : 'Epuisé'}
                                        </button>
                                        <button className="py-3.5 border border-neutral-200 dark:border-[#1a1a1a] text-neutral-900 dark:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-[#111111] transition-all">
                                            Détails
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recommendations */}
                {wishlistItems.length > 0 && !isComponent && (
                    <div className="mt-16">
                        <h2 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight mb-8">
                            Vous pourriez aussi aimer
                        </h2>
                        <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] p-6 shadow-soft">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                                        <div className="h-20 w-20 rounded-xl bg-neutral-100 dark:bg-[#1a1a1a] overflow-hidden shrink-0">
                                            <img src={`/api/placeholder/80/80`} alt="Produit" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[11px] font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">Produit Recommandé {i}</h4>
                                            <p className="text-[10px] font-black text-neutral-500 dark:text-neutral-400">45 000 GNF</p>
                                        </div>
                                        <button className="p-2 text-neutral-300 dark:text-neutral-700 hover:text-primary-500 transition-colors">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;

