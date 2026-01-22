import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';

const VendorProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix: '',
        stock: '',
        categorie: '',
        images: []
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getMyProducts();
            setProducts(response.data || []);
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

    const handleAddProduct = () => {
        setFormData({
            nom: '',
            description: '',
            prix: '',
            stock: '',
            categorie: '',
            images: []
        });
        setEditingProduct(null);
        setShowAddProductForm(true);
    };

    const handleEditProduct = (product) => {
        setFormData({
            nom: product.nom,
            description: product.description,
            prix: product.prix,
            stock: product.stock,
            categorie: product.categorie,
            images: product.images || []
        });
        setEditingProduct(product);
        setShowAddProductForm(true);
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await productService.deleteProduct(productId);
                setProducts(products.filter(p => p._id !== productId));
            } catch (error) {
                console.error('Erreur suppression produit:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                const response = await productService.updateProduct(editingProduct._id, formData);
                setProducts(products.map(p => p._id === editingProduct._id ? response.data : p));
            } else {
                const response = await productService.createProduct(formData);
                setProducts([...products, response.data]);
            }
            setShowAddProductForm(false);
            setEditingProduct(null);
        } catch (error) {
            console.error('Erreur sauvegarde produit:', error);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-GN', {
            style: 'currency',
            currency: 'GNF'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Mes Produits</h2>
                <button
                    onClick={handleAddProduct}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter un produit
                </button>
            </div>

            {showAddProductForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold mb-4">
                            {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Prix (GNF)</label>
                                    <input
                                        type="number"
                                        name="prix"
                                        value={formData.prix}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                                <select
                                    name="categorie"
                                    value={formData.categorie}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                >
                                    <option value="">Sélectionner une catégorie</option>
                                    <option value="Céréales">Céréales</option>
                                    <option value="Tubercules">Tubercules</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Légumes">Légumes</option>
                                    <option value="Huiles">Huiles</option>
                                    <option value="Épices">Épices</option>
                                    <option value="Artisanat">Artisanat</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddProductForm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    {editingProduct ? 'Mettre à jour' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.nom}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center text-gray-400">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{product.nom}</h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-green-600">{formatPrice(product.prix)}</span>
                                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorProducts;
