import React, { useState } from 'react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // Simulez un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Support request:', formData);
      alert('Votre message a été envoyé avec succès.');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const supportCategories = [
    { value: 'general', label: 'Question générale' },
    { value: 'order', label: 'Problème de commande' },
    { value: 'payment', label: 'Problème de paiement' },
    { value: 'delivery', label: 'Problème de livraison' },
    { value: 'product', label: 'Problème de produit' },
    { value: 'account', label: 'Problème de compte' },
    { value: 'technical', label: 'Problème technique' },
    { value: 'other', label: 'Autre' }
  ];

  const quickHelp = [
    {
      icon: '📦',
      title: 'Suivi de commande',
      description: 'Suivez votre commande en temps réel',
      action: 'Suivre ma commande'
    },
    {
      icon: '💳',
      title: 'Problème de paiement',
      description: 'Résolvez vos problèmes de paiement',
      action: 'Aide paiement'
    },
    {
      icon: '🔄',
      title: 'Retour/Échange',
      description: 'Initiez un retour ou un échange',
      action: 'Demander un retour'
    },
    {
      icon: '❓',
      title: 'FAQ',
      description: 'Consultez les questions fréquentes',
      action: 'Voir la FAQ'
    }
  ];

  return (
    <div className="min-h-screen bg-primary-light pt-16"> {/* Changez la couleur de fond */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">
            Centre d'Aide
          </h1>
          <p className="text-body text-lg">
            Nous sommes là pour vous aider. Comment pouvons-nous vous assister ?
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickHelp.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-caption mb-4">{item.description}</p>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                {item.action} →
              </button>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'contact'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Nous contacter
              </button>
              <button
                onClick={() => setActiveTab('live-chat')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'live-chat'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Chat en direct
              </button>
              <button
                onClick={() => setActiveTab('phone')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'phone'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Téléphone
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Contact Form Tab */}
            {activeTab === 'contact' && (
              <div className="max-w-2xl mx-auto">
                <h2 className="heading-3 mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {supportCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priorité
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Élevée</option>
                        <option value="urgent">Urgente</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Décrivez votre problème ou votre question en détail..."
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm mb-4">
                      {error}
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Envoi...' : 'Envoyer le message'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Live Chat Tab */}
            {activeTab === 'live-chat' && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-primary-50 rounded-lg p-8">
                  <div className="text-6xl mb-4">💬</div>
                  <h2 className="heading-3 mb-4">Chat en direct</h2>
                  <p className="text-body mb-6">
                    Discutez directement avec notre équipe de support. Temps de réponse moyen : 2 minutes.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      <span>3 agents disponibles</span>
                    </div>
                    <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                      Démarrer le chat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Phone Tab */}
            {activeTab === 'phone' && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">📞</div>
                  <h2 className="heading-3 mb-4">Support téléphonique</h2>
                  <p className="text-body">
                    Appelez-nous directement pour une assistance immédiate
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Support général</h3>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-primary-600">+224 XX XX XX XX</p>
                      <p className="text-sm text-gray-600">Lun-Ven: 8h-18h</p>
                      <p className="text-sm text-gray-600">Sam: 9h-15h</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Support technique</h3>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-blue-600">+224 YY YY YY YY</p>
                      <p className="text-sm text-gray-600">Lun-Ven: 9h-17h</p>
                      <p className="text-sm text-gray-600">Support spécialisé</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Conseil :</strong> Ayez votre numéro de commande à portée de main pour un service plus rapide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-semibold mb-2">Base de connaissances</h3>
            <p className="text-caption mb-4">Articles et guides détaillés</p>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Parcourir →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl mb-3">🎥</div>
            <h3 className="text-lg font-semibold mb-2">Tutoriels vidéo</h3>
            <p className="text-caption mb-4">Guides visuels étape par étape</p>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Regarder →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold mb-2">Communauté</h3>
            <p className="text-caption mb-4">Forum d'entraide utilisateurs</p>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Rejoindre →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
