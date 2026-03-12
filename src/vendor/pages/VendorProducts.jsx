import React, { useState, useEffect } from 'react';
import { productService, formatCurrency } from '../../services/api';

const VendorProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix: '',
        stock: '',
        categorie: 'Alimentation',
        region: 'Conakry',
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getMyProducts();
            setProducts(response.data?.products || []);
        } catch (error) {
            console.error('Erreur chargement produits:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);

            const data = new FormData();
            data.append('nom', formData.nom);
            data.append('description', formData.description);
            data.append('prix', formData.prix);
            data.append('stock', formData.stock);
            data.append('categorie', formData.categorie);
            data.append('region', formData.region);

            if (selectedFiles.length > 0) {
                selectedFiles.forEach(file => {
                    data.append('images', file);
                });
            }

            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, data);
            } else {
                await productService.createProduct(data);
            }
            setShowForm(false);
            setEditingProduct(null);
            setFormData({
                nom: '',
                description: '',
                prix: '',
                stock: '',
                categorie: 'Alimentation',
                region: 'Conakry',
                images: []
            });
            fetchProducts();
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error);
            const message = error.response?.data?.message || 'Une erreur est survenue lors de l\'enregistrement du produit.';
            alert(message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Generate previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({
            nom: '',
            description: '',
            prix: '',
            stock: '',
            categorie: 'Alimentation',
            region: 'Conakry',
        });
        setSelectedFiles([]);
        setPreviews([]);
        setShowForm(false);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            nom: product.nom,
            description: product.description,
            prix: product.prix,
            stock: product.stock,
            categorie: product.categorie || 'Alimentation',
            region: product.region || 'Conakry',
        });
        setPreviews(product.images || []);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous supprimer ce produit ?')) {
            try {
                await productService.deleteProduct(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                console.error('Erreur suppression:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-white mb-1.5">Mes Produits</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs">Gérez votre catalogue et vos stocks</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary-600/20 text-xs"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nouveau Produit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="bg-white dark:bg-[#0a0a0a] rounded-xl overflow-hidden border border-neutral-200 dark:border-[#1a1a1a] group hover:border-primary-500/30 transition-all duration-300 shadow-soft">
                            <div className="relative h-32 overflow-hidden bg-neutral-100 dark:bg-[#1a1a1a]">
                                {product.images?.[0] ? (
                                    <img src={product.images[0].startsWith('/uploads') ? `http://localhost:5000${product.images[0]}` : product.images[0]} alt={product.nom} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-700">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-black text-primary-500 uppercase tracking-widest border border-primary-500/20">
                                    {product.categorie}
                                </div>
                            </div>

                            <div className="p-3">
                                <h3 className="text-neutral-900 dark:text-white font-bold text-sm mb-0.5 truncate">{product.nom}</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-[9px] mb-2 line-clamp-1">{product.description}</p>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-neutral-500 dark:text-neutral-600 text-[8px] font-bold uppercase tracking-tighter mb-0.5">Prix</p>
                                        <p className="text-neutral-900 dark:text-white font-black text-base">{formatCurrency(product.prix)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-neutral-500 dark:text-neutral-600 text-[8px] font-bold uppercase tracking-tighter mb-0.5 text-right">Stock</p>
                                        <p className={`font-bold text-[10px] ${product.stock <= 5 ? 'text-red-500' : 'text-neutral-400 dark:text-neutral-500'}`}>{product.stock}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-neutral-100 dark:bg-[#1a1a1a] hover:bg-neutral-200 dark:hover:bg-[#1a1a1a]/40 text-neutral-600 dark:text-neutral-300 py-2 rounded-lg text-[10px] font-bold transition-colors"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 rounded-lg text-[10px] font-bold transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white dark:bg-[#0a0a0a] rounded-2xl p-12 border border-neutral-200 dark:border-[#1a1a1a] text-center shadow-soft">
                        <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-neutral-400 dark:text-neutral-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Aucun produit pour le moment</h2>
                        <p className="text-neutral-500 text-sm max-w-sm mx-auto">Commencez par ajouter votre premier produit local pour qu'il soit visible sur la plateforme.</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-6 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold transition-all text-sm"
                        >
                            Ajouter mon premier produit
                        </button>
                    </div>
                )}
            </div>

            {/* Modal simplified for logic demo, should be fully implemented if needed */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-neutral-900/40 dark:bg-[#0a0a0a]/90 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
                    <div className="relative bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#1a1a1a] w-full max-w-xl rounded-2xl p-6 overflow-y-auto max-h-[90vh] shadow-large">
                        <h2 className="text-lg font-black text-neutral-900 dark:text-white mb-4">
                            {editingProduct ? 'Modifier le produit' : 'Nouveau Produit Local'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Nom du produit</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-neutral-100 dark:bg-black/40 border border-transparent dark:border-white/10 rounded-xl py-2.5 px-4 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder="ex: Miel Pur de Labé"
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Catégorie</label>
                                    <select
                                        name="categorie"
                                        value={formData.categorie}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-neutral-100 dark:bg-black/40 border border-transparent dark:border-white/10 rounded-xl py-2.5 px-4 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none cursor-pointer"
                                    >
                                        {['Alimentation', 'Artisanat', 'Textile', 'Cosmétique', 'Electronique', 'Vêtements', 'Maison', 'Beauté', 'Sport', 'Autres'].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Région</label>
                                    <select
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-neutral-100 dark:bg-black/40 border border-transparent dark:border-white/10 rounded-xl py-2.5 px-4 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none cursor-pointer"
                                    >
                                        {['Conakry', 'Basse Guinée', 'Moyenne Guinée', 'Haute Guinée', 'Guinée Forestière', 'Autre'].map(reg => (
                                            <option key={reg} value={reg}>{reg}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Prix (GNF)</label>
                                    <input
                                        type="number"
                                        name="prix"
                                        min="0"
                                        value={formData.prix}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-neutral-100 dark:bg-black/40 border border-transparent dark:border-white/10 rounded-xl py-2.5 px-4 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Stock disponible</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-neutral-100 dark:bg-black/40 border border-transparent dark:border-white/10 rounded-xl py-2.5 px-4 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Images du produit</label>
                                    <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
                                        {previews.map((preview, idx) => (
                                            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-neutral-200 dark:border-[#1a1a1a] shrink-0">
                                                <img src={preview.startsWith('/uploads') ? `http://localhost:5000${preview}` : preview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        <label className="w-16 h-16 rounded-lg border-2 border-dashed border-neutral-200 dark:border-[#1a1a1a] flex flex-col items-center justify-center cursor-pointer hover:border-primary-500/50 transition-colors shrink-0">
                                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <input type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*" />
                                        </label>
                                    </div>
                                    <p className="text-[9px] text-neutral-500 italic">Sélectionnez jusqu'à 5 photos.</p>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="2"
                                        className="w-full bg-neutral-100 dark:bg-black/40 border border-transparent dark:border-white/10 rounded-xl py-2.5 px-4 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-bold py-2.5 rounded-lg transition-colors text-xs"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-black py-2.5 rounded-lg shadow-xl shadow-primary-600/20 transition-all text-xs flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Enregistrement...
                                        </>
                                    ) : (
                                        'Enregistrer'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorProducts;
