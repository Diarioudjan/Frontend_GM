import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiGrid,
    FiList,
    FiMapPin,
    FiSearch,
    FiShoppingBag,
    FiSliders,
    FiX
} from 'react-icons/fi';
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
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

    const categories = ['Alimentation', 'Textile', 'Artisanat', 'Cosmétique'];
    const regions = ['Basse Guinée', 'Moyenne Guinée', 'Haute Guinée', 'Guinée Forestière', 'Conakry'];
    const priceOptions = [
        { label: 'Tous les prix', value: 'all' },
        { label: 'Moins de 50 000 GNF', value: 'under-50k' },
        { label: 'Plus de 50 000 GNF', value: 'over-50k' }
    ];

    useEffect(() => {
        fetchProducts();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const query = searchParams.get('search')?.trim() || '';
        setSearchTerm(query);
    }, [searchParams]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAllProducts();
            if (response && response.data?.products) {
                setProducts(response.data.products);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur de chargement');
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedRegion('');
        setPriceRange('all');
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || p.categorie === selectedCategory;
        const matchesRegion = !selectedRegion || p.region === selectedRegion;
        let matchesPrice = true;

        if (priceRange === 'under-50k') matchesPrice = p.prix < 50000;
        if (priceRange === 'over-50k') matchesPrice = p.prix >= 50000;

        return matchesSearch && matchesCategory && matchesRegion && matchesPrice;
    });

    const hasActiveFilters = selectedCategory || selectedRegion || priceRange !== 'all' || searchTerm;

    if (isAuthenticated) {
        return <Navigate to="/catalogue-client" replace />;
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-inter">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-400 mb-3">
                        <Link to="/" className="hover:text-neutral-800 dark:hover:text-white transition-colors">Accueil</Link>
                        <span>/</span>
                        <span className="text-neutral-700 dark:text-neutral-200">Catalogue</span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                                Produits <span className="text-orange-500">Locaux</span>
                            </h1>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                Explorez les meilleurs produits artisanaux et agricoles de Guinée.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 lg:w-[420px]">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={17} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un produit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 pl-10 pr-3 text-sm text-neutral-900 dark:text-white outline-none focus:border-orange-500"
                                />
                            </div>
                            <button
                                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                className="lg:hidden h-11 w-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 flex items-center justify-center"
                            >
                                <FiSliders size={17} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {mobileFiltersOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="lg:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                >
                    <div className="px-4 py-4 grid grid-cols-1 gap-3">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm"
                        >
                            <option value="">Toutes categories</option>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm"
                        >
                            <option value="">Toutes regions</option>
                            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm"
                        >
                            {priceOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                </motion.div>
            )}

            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <aside className="hidden lg:block">
                        <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 space-y-5 sticky top-28">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Categorie</p>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm"
                                >
                                    <option value="">Toutes categories</option>
                                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Region</p>
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                    className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm"
                                >
                                    <option value="">Toutes regions</option>
                                    {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Prix</p>
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm"
                                >
                                    {priceOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="w-full h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                >
                                    Reinitialiser
                                </button>
                            )}
                        </div>
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                <span className="font-black text-neutral-900 dark:text-white">{filteredProducts.length}</span> produits trouves
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white dark:bg-neutral-900 text-neutral-600'}`}
                                >
                                    <FiGrid size={16} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white dark:bg-neutral-900 text-neutral-600'}`}
                                >
                                    <FiList size={16} />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-16">
                                <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl p-6 text-center">
                                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-10 text-center border border-neutral-200 dark:border-neutral-800">
                                <FiSearch size={34} className="mx-auto text-neutral-400 mb-3" />
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Aucun produit trouve</h3>
                                <button
                                    onClick={resetFilters}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold"
                                >
                                    <FiX size={15} /> Reinitialiser
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                layout
                                className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}
                            >
                                <AnimatePresence>
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            key={product._id}
                                            layout
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className={`group bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-orange-400/40 transition-all shadow-sm hover:shadow-lg cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}
                                            onClick={() => navigate(`/produit/${product._id}`)}
                                        >
                                            <div className={`${viewMode === 'list' ? 'w-48 shrink-0' : 'w-full'} h-52 bg-neutral-100 dark:bg-neutral-900 relative`}>
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0]} alt={product.nom} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                        <FiShoppingBag size={34} />
                                                    </div>
                                                )}
                                                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-white/90 dark:bg-black/70 text-[10px] font-bold text-neutral-700 dark:text-neutral-200 flex items-center gap-1">
                                                    <FiMapPin size={11} />
                                                    {product.region || 'Guinee'}
                                                </div>
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <p className="text-[11px] font-bold uppercase tracking-wide text-orange-500 mb-1">
                                                        {product.categorie || 'Produit local'}
                                                    </p>
                                                    <h3 className="text-base font-black text-neutral-900 dark:text-white line-clamp-2">
                                                        {product.nom}
                                                    </h3>
                                                    {viewMode === 'list' && (
                                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2">
                                                            {product.description}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
                                                    <p className="text-xl font-black text-neutral-900 dark:text-white">
                                                        {(product.prix as any)?.toLocaleString() || '0'} <span className="text-xs text-neutral-500">GNF</span>
                                                    </p>
                                                    <button
                                                        onClick={async (e) => {
                                                            e.stopPropagation();
                                                            await addToCart(product);
                                                        }}
                                                        disabled={!product.stock || product.stock <= 0}
                                                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide ${
                                                            product.stock && product.stock > 0
                                                                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                                                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {product.stock && product.stock > 0 ? 'Ajouter' : 'Epuisé'}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Produits;