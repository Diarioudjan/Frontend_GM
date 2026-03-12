import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api';
import { Product } from '../types';

const Produits: React.FC = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('all');

    const categories = ['Alimentation', 'Textile', 'Artisanat', 'Cosmétique'];
    const regions = ['Basse Guinée', 'Moyenne Guinée', 'Haute Guinée', 'Guinée Forestière', 'Conakry'];

    useEffect(() => {
        fetchProducts();
        window.scrollTo(0, 0);
    }, []);

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

    const filteredProducts = products.filter(p => {
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
            <div className="min-h-screen bg-neutral-50 dark:bg-black pt-32 flex justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black font-inter pb-20 overflow-x-hidden">
            {/* Search Header */}
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-neutral-100 dark:border-white/10 pt-20 pb-8 px-6 sticky top-0 z-30 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                            <Link to="/" className="hover:text-primary-500 transition-colors">Accueil</Link>
                            <span>›</span>
                            <span className="text-neutral-900 dark:text-white">Catalogue</span>
                        </div>
                        <h1 className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none italic">
                            Nos <span className="text-primary-500 not-italic">Produits</span>
                        </h1>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary-500 transition-colors text-lg">🔍</div>
                        <input
                            type="text"
                            placeholder="RECHERCHER UN PRODUIT..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-neutral-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white dark:focus:bg-white/10 transition-all font-bold uppercase tracking-widest placeholder:text-neutral-400"
                        />
                    </div>
                </div>

                {/* Mobile Chip Filters */}
                <div className="max-w-7xl mx-auto mt-6 flex overflow-x-auto pb-2 scrollbar-hide space-x-3 lg:hidden">
                    <button
                        onClick={() => setSelectedCategory('')}
                        className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${!selectedCategory ? 'bg-primary-500 text-white shadow-soft-orange' : 'bg-neutral-100 dark:bg-white/5 text-neutral-400'}`}
                    >
                        Tout
                    </button>
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setSelectedCategory(c)}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${selectedCategory === c ? 'bg-primary-500 text-white shadow-soft-orange' : 'bg-neutral-100 dark:bg-white/5 text-neutral-400'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block lg:w-72 flex-shrink-0 space-y-8 sticky top-48 h-fit">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-[11px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center">
                                <span className="w-8 h-[2px] bg-primary-500 mr-3"></span>
                                Catégories
                            </h2>
                            <div className="space-y-2">
                                {['Tout', ...categories].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setSelectedCategory(c === 'Tout' ? '' : c)}
                                        className={`w-full text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${(c === 'Tout' && !selectedCategory) || (selectedCategory === c) ? 'bg-primary-500 text-white shadow-soft-orange' : 'hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-500'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[11px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center">
                                <span className="w-8 h-[2px] bg-green-500 mr-3"></span>
                                Régions
                            </h2>
                            <div className="grid grid-cols-1 gap-2">
                                {regions.map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setSelectedRegion(selectedRegion === r ? '' : r)}
                                        className={`text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedRegion === r ? 'bg-green-500 text-white border-green-500 shadow-lg' : 'border-neutral-200 dark:border-white/5 text-neutral-500 hover:border-green-500/50'}`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[11px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center">
                                <span className="w-8 h-[2px] bg-sky-500 mr-3"></span>
                                Prix
                            </h2>
                            <div className="flex flex-col gap-2">
                                {[
                                    { label: 'Tous les prix', value: 'all' },
                                    { label: 'Sous 50k GNF', value: 'under-50k' },
                                    { label: 'Plus 50k GNF', value: 'over-50k' }
                                ].map(p => (
                                    <button
                                        key={p.value}
                                        onClick={() => setPriceRange(p.value)}
                                        className={`text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${priceRange === p.value ? 'bg-sky-500 text-white border-sky-500 shadow-lg' : 'border-neutral-200 dark:border-white/5 text-neutral-500 hover:border-sky-500/50'}`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={resetFilters}
                            className="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 border border-dashed border-neutral-300 dark:border-white/10 hover:border-primary-500 hover:text-primary-500 transition-all"
                        >
                            Réinitialiser
                        </button>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <div className="flex-1">
                    <div className="mb-8 flex justify-between items-end">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                            <span className="text-neutral-900 dark:text-white">{filteredProducts.length}</span> PRODUITS DISPONIBLES
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.map((p) => (
                                <div key={p._id || p.id} className="group glass-card rounded-[2.5rem] border border-neutral-100 dark:border-white/5 overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                                    <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-white/5">
                                        {p.images?.[0] ? (
                                            <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">🌿</div>
                                        )}

                                        {/* Action Badges */}
                                        <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                                            <span className="bg-white/90 dark:bg-black/50 backdrop-blur-md text-neutral-900 dark:text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                                {p.region || 'TERROIR'}
                                            </span>
                                            <button className="h-10 w-10 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-sm shadow-lg hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110 active:scale-95">❤️</button>
                                        </div>

                                        {/* Quick View Link */}
                                        <button
                                            onClick={() => navigate(`/produit/${p._id || p.id}`)}
                                            className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]"
                                        >
                                            <span className="bg-white text-primary-500 text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                                                VOIR LE PRODUIT
                                            </span>
                                        </button>
                                    </div>

                                    <div className="p-8">
                                        <div className="mb-6">
                                            <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">{p.categorie || 'GUINÉE'}</p>
                                            <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight group-hover:text-primary-500 transition-colors leading-tight mb-2 line-clamp-1 italic">{p.nom}</h3>
                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest line-clamp-2 leading-relaxed">{p.description}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-white/5">
                                            <p className="text-xl font-black text-neutral-900 dark:text-white tracking-tighter">
                                                {p.prix?.toLocaleString()} <span className="text-[10px] uppercase ml-1">GNF</span>
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(p);
                                                }}
                                                className="h-14 w-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 hover:scale-110 hover:-rotate-6 active:scale-95 transition-all"
                                                title="Acheter sur WhatsApp"
                                            >
                                                <span className="text-2xl">💬</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center glass-card rounded-[4rem] border border-dashed border-neutral-200 dark:border-white/10 pointer-events-none">
                            <div className="text-8xl mb-8 animate-bounce-gentle">🔍</div>
                            <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-4">La récolte est vide</h3>
                            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-black uppercase tracking-[0.3em] max-w-xs mx-auto mb-10 leading-relaxed">
                                Aucun produit ne correspond à vos critères. Essayez d'élargir vos horizons.
                            </p>
                            <button onClick={resetFilters} className="bg-primary-500 text-white px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-soft-orange pointer-events-auto hover:scale-105 transition-all">
                                TOUT RÉINITIALISER
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Produits;
