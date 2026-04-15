import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiFilter, FiGrid, FiHeart, FiList, FiMapPin, FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/api';
import { Product } from '../types';

const Produits: React.FC = () => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth() as any;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const categories = ['Alimentation', 'Textile', 'Artisanat', 'Cosmétique'];
    const regions = ['Basse Guinée', 'Moyenne Guinée', 'Haute Guinée', 'Guinée Forestière', 'Conakry'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productService.getAllProducts();
                setProducts(response?.data?.products || []);
            } catch (err) {
                console.error(err);
                setError('Erreur de chargement du catalogue');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const query = searchParams.get('search')?.trim() || '';
        setSearchTerm(query);
    }, [searchParams]);

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedRegion('');
        setPriceRange('all');
    };

    const getProductDetailPath = (id: string) =>
        isAuthenticated ? `/catalogue-client/produit/${id}` : `/produit/${id}`;

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || p.categorie === selectedCategory;
        const matchesRegion = !selectedRegion || p.region === selectedRegion;
        let matchesPrice = true;

        if (priceRange === 'under-50k') matchesPrice = p.prix < 50000;
        if (priceRange === 'over-50k') matchesPrice = p.prix >= 50000;

        return matchesSearch && matchesCategory && matchesRegion && matchesPrice;
    });

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    <p className="text-sm font-semibold text-neutral-500">Chargement du catalogue...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 dark:bg-[#050505] min-h-screen pb-10">
            <section className="py-5">
                <div className="mb-5">
                    <h1 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                        Catalogue <span className="text-orange-500">Boutique</span>
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Trouvez rapidement les produits locaux qui vous intéressent.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-4 md:p-5 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                        <div className="lg:col-span-5 relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 pl-10 pr-3 text-sm text-neutral-900 dark:text-white outline-none focus:border-orange-500"
                            />
                        </div>

                        <div className="lg:col-span-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-white outline-none focus:border-orange-500"
                            >
                                <option value="">Toutes catégories</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="lg:col-span-2">
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-white outline-none focus:border-orange-500"
                            >
                                <option value="">Toutes régions</option>
                                {regions.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        <div className="lg:col-span-2">
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-white outline-none focus:border-orange-500"
                            >
                                <option value="all">Tous les prix</option>
                                <option value="under-50k">Sous 50 000 GNF</option>
                                <option value="over-50k">Plus de 50 000 GNF</option>
                            </select>
                        </div>

                        <div className="lg:col-span-1">
                            <button
                                onClick={resetFilters}
                                className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold uppercase tracking-wide text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        <span className="font-black text-neutral-900 dark:text-white">{filteredProducts.length}</span> produits trouvés
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white dark:bg-neutral-900 text-neutral-500'}`}
                        >
                            <FiGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white dark:bg-neutral-900 text-neutral-500'}`}
                        >
                            <FiList size={16} />
                        </button>
                    </div>
                </div>

                {error ? (
                    <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-10 text-center border border-red-200 dark:border-red-900">
                        <p className="text-sm text-red-500 font-semibold">{error}</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-12 text-center border border-neutral-200 dark:border-neutral-800">
                        <FiSearch size={28} className="mx-auto text-neutral-400 mb-3" />
                        <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-2">Aucun produit trouvé</h3>
                        <button
                            onClick={resetFilters}
                            className="mt-3 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}
                    >
                        <AnimatePresence>
                            {filteredProducts.map((p) => (
                                <motion.div
                                    key={p._id || p.id}
                                    layout
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    onClick={() => navigate(getProductDetailPath(p._id || p.id))}
                                    className={`bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-orange-400/40 transition-all cursor-pointer ${viewMode === 'list' ? 'flex items-stretch' : ''}`}
                                >
                                    <div className={`${viewMode === 'list' ? 'w-48 shrink-0' : 'w-full'} h-52 bg-neutral-100 dark:bg-neutral-900 relative`}>
                                        {p.images?.[0] ? (
                                            <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                <FiShoppingBag size={34} />
                                            </div>
                                        )}
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 flex items-center justify-center text-rose-500"
                                        >
                                            <FiHeart size={16} />
                                        </button>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[11px] font-bold uppercase tracking-wide text-orange-500">
                                                    {p.categorie || 'Produit local'}
                                                </span>
                                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                                                    <FiMapPin size={12} />
                                                    {p.region || 'Guinée'}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-black text-neutral-900 dark:text-white line-clamp-2 mb-2">
                                                {p.nom}
                                            </h3>
                                            {viewMode === 'list' && (
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                                                    {p.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
                                            <p className="text-xl font-black text-neutral-900 dark:text-white">
                                                {p.prix?.toLocaleString() || '0'} <span className="text-xs text-neutral-500">GNF</span>
                                            </p>
                                            <button
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    await addToCart(p);
                                                }}
                                                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-wide"
                                            >
                                                Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default Produits;








