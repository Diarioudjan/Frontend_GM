import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données de démonstration
  const demoWishlist = [
    {
      id: 1,
      name: 'Masque traditionnel Baga',
      price: 75000,
      originalPrice: 85000,
      image: '/api/placeholder/300/300',
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
      image: '/api/placeholder/300/300',
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
      image: '/api/placeholder/300/300',
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
      image: '/api/placeholder/300/300',
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

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addToCart = (item) => {
    // Logique d'ajout au panier
    console.log('Ajouté au panier:', item);
    // Vous pouvez ajouter une notification ici
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ma Liste de Souhaits
          </h1>
          <p className="text-gray-600 dark:text-neutral-400">
            {wishlistItems.length} produit{wishlistItems.length > 1 ? 's' : ''} dans votre liste de souhaits
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 dark:text-neutral-500 text-6xl mb-4">💝</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Votre liste de souhaits est vide
            </h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-6">
              Parcourez nos produits et ajoutez vos favoris à votre liste de souhaits
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Découvrir nos produits
            </button>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Rupture de stock
                      </span>
                    </div>
                  )}
                  {item.originalPrice && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                        -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white dark:bg-neutral-700 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-neutral-600 transition-colors"
                  >
                    <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-neutral-400">
                      {item.rating} ({item.reviews} avis)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {item.price.toLocaleString()} GNF
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 dark:text-neutral-500 line-through">
                          {item.originalPrice.toLocaleString()} GNF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-gray-500 dark:text-neutral-500 mb-4">
                    Ajouté le {new Date(item.addedDate).toLocaleDateString('fr-FR')}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${item.inStock
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 dark:bg-neutral-600 text-gray-500 dark:text-neutral-400 cursor-not-allowed'
                        }`}
                    >
                      {item.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                    </button>
                    <button className="w-full py-2 px-4 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                      Voir les détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {wishlistItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Vous pourriez aussi aimer
            </h2>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <img
                      src={`/api/placeholder/80/80`}
                      alt="Produit recommandé"
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">Produit recommandé {i}</h4>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">45 000 GNF</p>
                    </div>
                    <button className="p-2 text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
