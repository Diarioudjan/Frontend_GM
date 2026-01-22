import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FicheProduit = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Données simulées du produit
  const product = {
    id: id,
    name: 'Riz Local de Kindia',
    price: 25000,
    originalPrice: 30000,
    currency: 'GNF',
    description: 'Riz local cultivé dans les rizières de Kindia, récolté à la main et séché naturellement. Ce riz est réputé pour sa saveur unique et sa texture parfaite.',
    longDescription: `Le riz de Kindia est cultivé dans les rizières traditionnelles de la région de Kindia, au cœur de la Guinée. Les agriculteurs locaux utilisent des méthodes ancestrales de culture, garantissant un produit 100% naturel et authentique.

    Ce riz est récolté manuellement à maturité optimale, puis séché naturellement au soleil. Il est ensuite trié et nettoyé avec soin pour éliminer toutes les impuretés.

    Caractéristiques :
    • Texture ferme et moelleuse
    • Saveur douce et naturelle
    • Riche en nutriments essentiels
    • Sans conservateurs ni additifs
    • Emballage écologique`,
    images: [
      '🌾',
      '🌱',
      '🏞️',
      '👨‍🌾'
    ],
    category: 'Alimentaire',
    region: 'Kindia',
    producer: 'Coopérative des Riziculteurs de Kindia',
    stock: 150,
    unit: 'kg',
    rating: 4.8,
    reviews: 127,
    features: [
      '100% Naturel',
      'Sans conservateurs',
      'Riche en nutriments',
      'Emballage écologique'
    ],
    specifications: {
      'Poids': '1 kg',
      'Origine': 'Kindia, Guinée',
      'Conservation': '12 mois',
      'Certification': 'Bio local'
    }
  };

  const reviews = [
    {
      id: 1,
      user: 'Mariama D.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent riz ! La texture est parfaite et le goût est authentique. Je recommande vivement !'
    },
    {
      id: 2,
      user: 'Souleymane K.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Très bon produit, livraison rapide. Le riz est de qualité et le prix est raisonnable.'
    },
    {
      id: 3,
      user: 'Fatoumata B.',
      rating: 5,
      date: '2024-01-08',
      comment: 'Je l\'achète régulièrement pour ma famille. Le goût est incomparable !'
    }
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20">
      <div className="container-custom py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-neutral-400">
            <li><Link to="/" className="hover:text-primary dark:hover:text-primary-400">Accueil</Link></li>
            <li>/</li>
            <li><Link to="/produits" className="hover:text-primary dark:hover:text-primary-400">Produits</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{product.name}</li>
          </ol>
        </nav>

        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
              {/* Images du produit */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded-2xl flex items-center justify-center text-8xl shadow-soft overflow-hidden">
                {product.images[selectedImage]}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary-500 dark:ring-primary-400 shadow-medium scale-105' 
                        : 'hover:ring-2 hover:ring-primary-200 dark:hover:ring-primary-800 hover:scale-105'
                    }`}
                  >
                    {image}
                  </button>
                ))}
              </div>
            </div>

            {/* Informations du produit */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-neutral-400">
                      {product.rating} ({product.reviews} avis)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-neutral-500">•</span>
                  <span className="text-sm text-gray-500 dark:text-neutral-400">{product.category}</span>
                  <span className="text-sm text-gray-500 dark:text-neutral-500">•</span>
                  <span className="text-sm text-gray-500 dark:text-neutral-400">{product.region}</span>
                </div>
              </div>

              {/* Prix */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 flex-wrap">
                  <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(product.price)} {product.currency}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-neutral-500 dark:text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)} {product.currency}
                    </span>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-semibold px-3 py-1.5 rounded-lg">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% de réduction
                  </span>
                )}
              </div>

              {/* Description courte */}
              <p className="text-gray-700 dark:text-neutral-300 leading-relaxed">{product.description}</p>

              {/* Caractéristiques */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Caractéristiques :</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-neutral-400">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Producteur */}
              <div className="bg-gradient-to-br from-primary-50 to-gold-50 dark:from-neutral-700 dark:to-neutral-800 p-5 rounded-xl border border-primary-200 dark:border-primary-800">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">Producteur</h3>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 font-medium">{product.producer}</p>
              </div>

              {/* Quantité et stock */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-900 dark:text-white">Quantité :</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-neutral-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-600 dark:text-white"
                    >
                      -
                    </button>
                    <span className="w-12 text-center dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-neutral-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-600 dark:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  Stock disponible : {product.stock} {product.unit}
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-3 text-lg font-semibold"
                >
                  Ajouter au panier
                </button>
                <button className="w-full border-2 border-primary dark:border-primary-400 text-primary dark:text-primary-400 py-3 rounded-lg font-semibold hover:bg-primary dark:hover:bg-primary-600 hover:text-white transition-colors duration-200">
                  Acheter maintenant
                </button>
              </div>
            </div>
          </div>

          {/* Onglets détaillés */}
          <div className="border-t border-gray-200 dark:border-neutral-700">
            <div className="px-8 py-6">
              <div className="border-b border-gray-200 dark:border-neutral-700">
                <nav className="-mb-px flex space-x-8">
                  <button className="border-b-2 border-primary dark:border-primary-400 text-primary dark:text-primary-400 py-2 px-1 font-medium">
                    Description
                  </button>
                  <button className="border-b-2 border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 py-2 px-1 font-medium">
                    Spécifications
                  </button>
                  <button className="border-b-2 border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 py-2 px-1 font-medium">
                    Avis ({reviews.length})
                  </button>
                </nav>
              </div>

              <div className="py-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                    {product.longDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-2 mb-2">Produits similaires</h2>
              <p className="text-body">Découvrez d'autres produits qui pourraient vous intéresser</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card-hover group">
                <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center text-5xl rounded-t-2xl">
                  {['🫒', '☕', '🍯', '🥜'][item - 1]}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Produit Similaire {item}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-bold text-lg mb-4">
                    {formatPrice(15000 + item * 5000)} {product.currency}
                  </p>
                  <button className="w-full btn-outline text-sm">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheProduit; 