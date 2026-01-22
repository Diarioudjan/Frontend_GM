import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';

const Paiement = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Orange Money');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});

  // Rediriger si le panier est vide
  useEffect(() => {
    if (cartItems.length === 0) {
      // Optionnel : rediriger ou afficher un message
      // navigate('/panier');
    }
  }, [cartItems, navigate]);

  // Calcul des totaux (Doit correspondre à la logique backend pour l'affichage)
  const itemsPrice = cartTotal;
  const taxPrice = itemsPrice * 0.15; // TVA 15%
  const shippingPrice = itemsPrice > 100000 ? 0 : 5000;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    // if (!formData.region.trim()) newErrors.region = 'La région est requise'; // La région est optionnelle dans le backend si on utilise "ville" ? Backend utilise 'ville' dans l'objet adresse.

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Préparer les données pour le backend
        const orderData = {
          orderItems: cartItems.map(item => ({
            product: item.product._id || item.product.id,
            name: item.product.nom,
            quantity: item.quantity,
            price: item.product.prix,
            image: item.product.images && item.product.images.length > 0 ? item.product.images[0] : '/placeholder.png'
          })),
          shippingAddress: {
            nom: `${formData.firstName} ${formData.lastName}`,
            telephone: formData.phone,
            adresse: {
              rue: formData.address,
              ville: formData.city,
              codePostal: formData.postalCode || '',
              pays: 'Guinée'
            }
          },
          paymentMethod: paymentMethod
        };

        const response = await orderService.createOrder(orderData);

        if (response.status === 'success') {
          // Vider le panier (le backend le fait aussi souvent, mais le contexte frontend doit être mis à jour)
          clearCart();
          alert('Commande confirmée avec succès !');
          navigate('/commandes'); // Rediriger vers l'historique ou une page de succès
        }
      } catch (error) {
        console.error('Erreur lors de la commande:', error);
        alert(error.response?.data?.message || 'Une erreur est survenue lors de la commande.');
      } finally {
        setLoading(false);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Votre panier est vide</h2>
        <Link to="/produits" className="btn-primary">
          Retourner à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de paiement */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Informations de livraison
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    Adresse de livraison *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white ${errors.address ? 'border-red-500' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Région *
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className={`input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white ${errors.region ? 'border-red-500' : ''}`}
                    >
                      <option value="">Sélectionner une région</option>
                      <option value="Conakry">Conakry</option>
                      <option value="Kindia">Kindia</option>
                      <option value="Kankan">Kankan</option>
                      <option value="Labé">Labé</option>
                      <option value="Mamou">Mamou</option>
                      <option value="Nzérékoré">Nzérékoré</option>
                    </select>
                    {/* Region not strictly required by backend schema if city covers it, but nice to have */}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="input-field dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Méthodes de paiement */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Méthode de paiement
              </h2>

              <div className="space-y-4">
                <div className={`flex items-center space-x-3 p-4 border rounded-lg ${paymentMethod === 'Orange Money' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-neutral-700'}`}>
                  <input
                    type="radio"
                    id="orange"
                    name="paymentMethod"
                    value="Orange Money"
                    checked={paymentMethod === 'Orange Money'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <label htmlFor="orange" className="flex items-center space-x-3 cursor-pointer w-full">
                    <span className="text-2xl">🟠</span>
                    <div>
                      <div className="font-medium dark:text-white">Orange Money</div>
                    </div>
                  </label>
                </div>

                <div className={`flex items-center space-x-3 p-4 border rounded-lg ${paymentMethod === 'MTN MoMo' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-neutral-700'}`}>
                  <input
                    type="radio"
                    id="mtn"
                    name="paymentMethod"
                    value="MTN MoMo"
                    checked={paymentMethod === 'MTN MoMo'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-yellow-600 focus:ring-yellow-500"
                  />
                  <label htmlFor="mtn" className="flex items-center space-x-3 cursor-pointer w-full">
                    <span className="text-2xl">🟡</span>
                    <div>
                      <div className="font-medium dark:text-white">MTN MoMo</div>
                    </div>
                  </label>
                </div>

                <div className={`flex items-center space-x-3 p-4 border rounded-lg ${paymentMethod === 'Carte Bancaire' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-neutral-700'}`}>
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="Carte Bancaire"
                    checked={paymentMethod === 'Carte Bancaire'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="card" className="flex items-center space-x-3 cursor-pointer w-full">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="font-medium dark:text-white">Carte bancaire</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Résumé de commande ({cartItems.length} articles)
              </h2>

              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm dark:text-neutral-300 border-b border-gray-100 dark:border-neutral-700 pb-2">
                    <div className="flex-1 pr-2">
                      <span className="font-medium">{item.product.nom}</span>
                      <div className="text-xs text-gray-500">x{item.quantity}</div>
                    </div>
                    <span>{formatPrice(item.product.prix * item.quantity)} GNF</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>Sous-total HT</span>
                  <span>{formatPrice(itemsPrice)} GNF</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>TVA (15%)</span>
                  <span>{formatPrice(taxPrice)} GNF</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>Livraison</span>
                  <span>{shippingPrice === 0 ? 'Gratuite' : `${formatPrice(shippingPrice)} GNF`}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-neutral-700 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total TTC</span>
                    <span>{formatPrice(totalPrice)} GNF</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full btn-primary py-3 text-lg font-semibold mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Traitement...' : 'Confirmer la commande'}
              </button>

              <div className="mt-6 text-sm text-gray-600 dark:text-neutral-400 text-center">
                <p>En confirmant votre commande, vous acceptez nos conditions de vente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paiement; 