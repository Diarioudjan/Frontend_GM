import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api';

const Produits = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['Tous', 'Alimentaire', 'Textile', 'Artisanat', 'Cosmétique'];
  const regions = ['Toutes', 'Conakry', 'Kindia', 'Kankan', 'Labé', 'Mamou', 'Nzérékoré'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // On pourrait passer des filtres à l'API ici, mais pour l'instant on filtre côté client
      const response = await productService.getAllProducts();
      setProducts(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Erreur chargement produits:', err);
      setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tous' || product.categorie === selectedCategory;
    const matchesRegion = selectedRegion === '' || selectedRegion === 'Toutes' || product.region === selectedRegion;

    return matchesSearch && matchesCategory && matchesRegion;
  });

  // Tri des produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.prix - b.prix;
      case 'price-high':
        return b.prix - a.prix;
      case 'name':
        return a.nom.localeCompare(b.nom);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors duration-300">
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white py-16 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <h1 className="heading-1 text-white mb-4">Nos Produits</h1>
          <p className="text-xl text-white/90 max-w-2xl">Découvrez notre sélection de produits du terroir guinéen</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres et recherche */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rechercher</label>
              <input
                type="text"
                placeholder="Nom du produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Région */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Région</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="input-field"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Tri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trier par</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="name">Nom</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchProducts} className="btn-primary">Réessayer</button>
          </div>
        ) : (
          /* Grille des produits */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <div key={product._id || product.id} className="card-hover group">
                {/* Lien vers le détail du produit */}
                <Link to={`/produit/${product._id || product.id}`}>
                  <div className="relative h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center text-7xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                    {/* Affichage image ou emoji fallback */}
                    {product.images && product.images.length > 0 ? (
                      product.images[0].length < 10 ? ( // Simple check for emoji vs url (very basic)
                        <span>{product.images[0]}</span>
                      ) : (
                        <img src={product.images[0]} alt={product.nom} className="w-full h-full object-cover" />
                      )
                    ) : (
                      <span>📦</span>
                    )}

                    <div className="absolute top-3 right-3">
                      <span className="badge-primary text-xs">{product.region}</span>
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="mb-2">
                    <span className="badge-gold text-xs mb-2 inline-block">{product.categorie}</span>
                    <Link to={`/produit/${product._id || product.id}`}>
                      <h3 className="font-semibold text-neutral-900 dark:text-white text-base mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{product.nom}</h3>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-xl">{product.prix.toLocaleString()} GNF</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Stock: {product.stock}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full btn-primary text-sm py-2.5"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (Simplifiée pour l'instant) */}
        {sortedProducts.length > 12 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-primary">Précédent</button>
              <button className="px-3 py-2 bg-primary text-white rounded">1</button>
              <button className="px-3 py-2 text-gray-500 hover:text-primary">Suivant</button>
            </nav>
          </div>
        )}

        {/* Message si aucun produit */}
        {!loading && !error && sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedRegion('');
              }}
              className="btn-primary"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produits;