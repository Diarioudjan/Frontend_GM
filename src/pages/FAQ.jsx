import React, { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      id: 1,
      category: "Commandes",
      question: "Comment passer une commande sur GuineeMakiti ?",
      answer: "Pour passer une commande, parcourez notre catalogue, ajoutez les produits souhaités à votre panier, puis suivez les étapes de commande. Vous devrez créer un compte ou vous connecter pour finaliser votre achat."
    },
    {
      id: 2,
      category: "Commandes",
      question: "Puis-je modifier ou annuler ma commande ?",
      answer: "Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa validation. Après ce délai, contactez notre service client pour toute modification."
    },
    {
      id: 3,
      category: "Livraison",
      question: "Quels sont les délais de livraison ?",
      answer: "Les délais varient selon votre localisation : 2-3 jours pour Conakry, 3-5 jours pour les autres villes de Guinée, et 7-14 jours pour l'international."
    },
    {
      id: 4,
      category: "Livraison",
      question: "Livrez-vous à l'international ?",
      answer: "Oui, nous livrons dans plusieurs pays. Les frais de livraison sont calculés automatiquement lors de la commande selon votre destination."
    },
    {
      id: 5,
      category: "Paiement",
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), Orange Money, MTN Mobile Money, et le paiement à la livraison pour certaines zones."
    },
    {
      id: 6,
      category: "Paiement",
      question: "Mes informations de paiement sont-elles sécurisées ?",
      answer: "Absolument. Nous utilisons un cryptage SSL et travaillons avec des partenaires de paiement certifiés pour garantir la sécurité de vos données."
    },
    {
      id: 7,
      category: "Produits",
      question: "Vos produits sont-ils authentiques ?",
      answer: "Tous nos produits sont créés par des artisans guinéens certifiés. Chaque article est accompagné d'un certificat d'authenticité."
    },
    {
      id: 8,
      category: "Produits",
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous disposez de 14 jours pour retourner un produit non personnalisé dans son état d'origine. Les frais de retour sont à votre charge sauf en cas de défaut."
    },
    {
      id: 9,
      category: "Compte",
      question: "Comment créer un compte ?",
      answer: "Cliquez sur 'Inscription' en haut de la page, remplissez le formulaire avec vos informations, et confirmez votre email pour activer votre compte."
    },
    {
      id: 10,
      category: "Compte",
      question: "J'ai oublié mon mot de passe, que faire ?",
      answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion, entrez votre email, et suivez les instructions envoyées par email."
    }
  ];

  const categories = [...new Set(faqData.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20">
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-2 mb-4 text-white">
            Questions Fréquemment Posées
          </h1>
          <p className="text-body text-lg !text-white/90">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium">
              Toutes
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border border-gray-300 dark:border-neutral-700 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-700"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div key={item.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-neutral-700"
              >
                <div>
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold dark:text-white mt-1">
                    {item.question}
                  </h3>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-500 dark:text-neutral-400 transition-transform duration-200 ${openItems[item.id] ? 'transform rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItems[item.id] && (
                <div className="px-6 pb-4">
                  <p className="text-body leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-primary-50 dark:bg-primary-900/30 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold dark:text-white mb-4">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-body mb-6">
            Notre équipe de support est là pour vous aider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Contacter le Support
            </button>
            <button className="bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors">
              Envoyer un Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
