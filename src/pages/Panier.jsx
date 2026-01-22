import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Panier = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const shipping = cartTotal > 100000 ? 0 : 5000;
  const total = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="h-48 bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-6xl text-gray-500 dark:text-neutral-400">
              {/* Remplacez le texte de l'image par une icône ou un contenu approprié */}
              🛒
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 dark:text-neutral-400 mb-8">Découvrez nos produits locaux !</p>
            <Link to="/produits" className="btn-primary text-lg px-8 py-3">
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white py-16 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <h1 className="heading-1 text-white mb-4">Votre Panier</h1>
          <p className="text-xl text-white/90">Retrouvez tous vos articles sélectionnés ici</p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section des articles */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Articles ({cartItems.length})</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700 pb-6 mb-6 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-neutral-400">{item.category}</p>
                      <p className="text-sm text-gray-500 dark:text-neutral-400">Vendeur: {item.seller}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Contrôles de quantité */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-neutral-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors dark:text-white"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-neutral-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors dark:text-white"
                      >
                        +
                      </button>
                    </div>

                    {/* Prix */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)} GNF</p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p className="text-sm text-gray-500 dark:text-neutral-500 line-through">{formatPrice(item.originalPrice * item.quantity)} GNF</p>
                      )}
                    </div>

                    {/* Bouton supprimer */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                      title="Supprimer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section résumé de la commande */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Résumé de la commande</h2>

              {/* Code promo */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Code promo</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Entrez votre code"
                    className="flex-1 input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  />
                  <button className="btn-outline px-4">Appliquer</button>
                </div>
              </div>

              {/* Détails du résumé */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>Sous-total ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})</span>
                  <span>{formatPrice(cartTotal)} GNF</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>Frais de livraison</span>
                  <span>{shipping === 0 ? 'Gratuit' : `${formatPrice(shipping)} GNF`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction</span>
                    <span>-{formatPrice(discount)} GNF</span>
                  </div>
                )}
                <hr className="border-gray-200 dark:border-neutral-700" />
                <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(total - discount)} GNF</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3">
                <Link
                  to="/paiement"
                  className="w-full btn-primary text-center block"
                >
                  Passer à la caisse
                </Link>
                <Link
                  to="/produits"
                  className="w-full btn-outline text-center block"
                >
                  Continuer les achats
                </Link>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
                <div className="flex items-center text-sm text-gray-500 dark:text-neutral-400 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Paiement sécurisé
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-neutral-400">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Livraison gratuite dès 100,000 GNF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;