import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="heading-1 text-white mb-6">
              À propos de GuinéeMakiti
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Votre plateforme e-commerce dédiée à la promotion et à la valorisation
              des produits du terroir guinéen
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/produits"
                className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Découvrir nos produits
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-3 mb-6">
                Notre Mission
              </h2>
              <p className="text-body text-lg mb-6">
                GuinéeMakiti est née de la volonté de créer un pont numérique entre
                les producteurs locaux guinéens et les consommateurs du monde entier.
                Notre mission est de promouvoir, valoriser et commercialiser les
                richesses du terroir guinéen.
              </p>
              <p className="text-body text-lg mb-6">
                Nous croyons fermement au potentiel économique et culturel des
                produits locaux de la Guinée. Notre plateforme offre une visibilité
                internationale aux artisans, agriculteurs et coopératives locales,
                tout en préservant l'authenticité et la qualité de leurs produits.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="heading-3 text-primary-500 dark:text-primary-400 mb-2">100+</div>
                  <div className="text-caption">Producteurs locaux</div>
                </div>
                <div className="text-center">
                  <div className="heading-3 text-primary-500 dark:text-primary-400 mb-2">500+</div>
                  <div className="text-caption">Produits authentiques</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/guinea-culture.jpg"
                alt="Culture guinéenne"
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/05613E/FFFFFF?text=Culture+Guinéenne';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-body text-lg max-w-2xl mx-auto">
              Nous nous engageons à respecter et promouvoir ces valeurs fondamentales
              dans toutes nos actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-white mb-3">
                Authenticité
              </h3>
              <p className="text-body">
                Nous garantissons l'authenticité de chaque produit,
                préservant les traditions et savoir-faire locaux.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-white mb-3">
                Solidarité
              </h3>
              <p className="text-body">
                Nous soutenons les producteurs locaux en leur offrant
                une plateforme équitable et transparente.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-white mb-3">
                Durabilité
              </h3>
              <p className="text-body">
                Nous promouvons des pratiques durables et respectueuses
                de l'environnement et des communautés locales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">
              Nos Catégories de Produits
            </h2>
            <p className="text-body text-lg max-w-2xl mx-auto">
              Découvrez la richesse et la diversité des produits du terroir guinéen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Alimentaire',
                description: 'Produits agricoles, épices, fruits secs',
                icon: '🍎',
                color: 'bg-primary-100 dark:bg-primary-900/30'
              },
              {
                name: 'Textile',
                description: 'Tissus traditionnels, vêtements artisanaux',
                icon: '👕',
                color: 'bg-blue-100 dark:bg-blue-900/30'
              },
              {
                name: 'Artisanat',
                description: 'Objets d\'art, sculptures, bijoux',
                icon: '🎨',
                color: 'bg-yellow-100 dark:bg-yellow-900/30'
              },
              {
                name: 'Cosmétique',
                description: 'Huiles essentielles, savons naturels',
                icon: '🌸',
                color: 'bg-pink-100 dark:bg-pink-900/30'
              }
            ].map((category) => (
              <div key={category.name} className="text-center">
                <div className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-semibold dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-caption">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">
              Notre Équipe
            </h2>
            <p className="text-body text-lg max-w-2xl mx-auto">
              Une équipe passionnée dédiée à la promotion du terroir guinéen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 text-center shadow-md">
              <div className="w-24 h-24 bg-gray-200 dark:bg-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-white mb-2">
                Diariou Barry
              </h3>
              <p className="text-primary-500 dark:text-primary-400 font-medium mb-2">Fondateur & CEO</p>
              <p className="text-caption">
                Passionné par le développement local et l'innovation technologique
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 text-center shadow-md">
              <div className="w-24 h-24 bg-gray-200 dark:bg-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-white mb-2">
                Équipe Technique
              </h3>
              <p className="text-primary-500 dark:text-primary-400 font-medium mb-2">Développement</p>
              <p className="text-caption">
                Experts en développement web et mobile
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 text-center shadow-md">
              <div className="w-24 h-24 bg-gray-200 dark:bg-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-white mb-2">
                Partenaires Locaux
              </h3>
              <p className="text-primary-500 dark:text-primary-400 font-medium mb-2">Réseau</p>
              <p className="text-caption">
                Producteurs, artisans et coopératives partenaires
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-white mb-6">
            Rejoignez l'aventure GuinéeMakiti
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez les richesses du terroir guinéen et soutenez
            les producteurs locaux en achetant leurs produits authentiques.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/produits"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Parcourir les produits
            </Link>
            <Link
              to="/inscription"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 