import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Carousel from '../components/Carousel';

const Home = () => {
  const location = useLocation();

  const regions = [
    {
      name: 'Basse Guinée',
      products: 45,
      label: 'Côtiers',
      backgroundImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Littoral'
    },
    {
      name: 'Moyenne Guinée',
      products: 32,
      label: 'Savoir',
      backgroundImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Savane'
    },
    {
      name: 'Haute Guinée',
      products: 28,
      label: 'Soleil',
      backgroundImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Désert'
    },
    {
      name: 'Guinée Forestière',
      products: 38,
      label: 'Café',
      backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Forêt'
    },
  ];

  const engagements = [
    {
      title: "Produits 100% Naturels & Bio",
      description: "Nous privilégions des méthodes de culture respectueuses de la santé et de la richesse de nos sols pour un goût authentique.",
      icon: "🌱",
      tag: "eco"
    },
    {
      title: "Commerce Équitable",
      description: "Nous garantissons une rémunération juste à chaque producteur pour leur permettre de faire vivre leurs traditions locales.",
      icon: "🤝",
      tag: "handshake"
    },
    {
      title: "Soutien au Développement Local",
      description: "Chaque achat contribue directement à l'économie rurale et à l'autonomie des communautés agricoles guinéennes.",
      icon: "👥",
      tag: "groups"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Miel Pur de Labé',
      price: '45.000 GNF',
      description: '100% naturel, récolté dans les montagnes du Fouta.',
      badge: 'MEILLEUR CHOIX',
      badgeColor: 'bg-yellow-500',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Riz de Boffa (10kg)',
      price: '85.000 GNF',
      description: 'Riz local de qualité supérieure, goût authentique.',
      badge: 'SUPER GOÛT',
      badgeColor: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Ananas Victoria Kindia',
      price: '15.000 GNF / kg',
      description: 'Extra sucré, cueilli à maturité en pleine terre.',
      badge: 'SUPER SUCRÉ',
      badgeColor: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1550258114-68bd2998ce9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Café Ziama (Macenta)',
      price: '90.000 GNF',
      description: 'Arôme intense des montagnes de la Corée.',
      badge: '100% ARABICA',
      badgeColor: 'bg-green-600',
      image: 'https://images.unsplash.com/photo-1559056191-4917a119c3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const testimonials = [
    {
      name: "Mamadou Diallo",
      role: "Maraîcher à Kindia",
      quote: "Grâce à GuinéeMakiti, je peux vendre mes produits aux familles de Conakry sans passer par des intermédiaires qui cassent les prix.",
      avatar: "/images/testimonials/mamadou.png",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "Fanta Keita",
      role: "Productrice de miel à Labé",
      quote: "Mes clients sont maintenant dans tout le pays. C'est une fierté de voir le travail de nos abeilles reconnu partout.",
      avatar: "/images/testimonials/fanta.png",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      name: "Ibrahima Soumah",
      role: "Pêcheur à Boffa",
      quote: "Le système de commande directe simplifie tout. Le poisson arrive frais et les revenus sont plus justes.",
      avatar: "/images/testimonials/ibrahima.png",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  const steps = [
    {
      title: "Choisissez vos produits",
      description: "Explorez notre catalogue et sélectionnez les meilleurs produits du terroir en quelques clics.",
      icon: "🛒"
    },
    {
      title: "Confirmez sur WhatsApp",
      description: "Le lien vous connecte à notre service client pour valider les quantités et le lieu de livraison.",
      icon: "💬"
    },
    {
      title: "Recevez et Savourez",
      description: "Dans les délais courts, vous recevez vos produits frais directement chez vous ou au bureau.",
      icon: "🚛"
    }
  ];

  const blogPosts = [
    {
      title: "La récolte du miel blanc de Labé : une saison exceptionnelle",
      description: "Les apiculteurs du Fouta-Djalon célèbrent cette année une récolte historique. Découvrez les secrets d'un miel aux mille vertus.",
      date: "12 Octobre 2023",
      image: "https://images.unsplash.com/photo-1473973266408-ed4e27f37302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "RÉCOLTE"
    },
    {
      title: "Bienvenue à la coopérative de café de Macenta",
      description: "Portrait d'hommes et de femmes qui chaque année se battent pour l'excellence du café de Guinée Forestière.",
      date: "05 Octobre 2023",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "NOUVEAUTÉ"
    },
    {
      title: "Comment vos achats transforment les villages de Guinée",
      description: "Grâce au circuit court, les revenus des producteurs locaux sont en hausse de 40% sur l'année écoulée.",
      date: "28 Septembre 2023",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "IMPACT"
    }
  ];

  // Slides pour le carrousel
  const carouselSlides = [
    {
      title: "L'excellence du terroir guinéen",
      description: "Découvrez les richesses agricoles des quatre régions de la Guinée et commandez directement auprès de nos producteurs via WhatsApp.",
      badge: "PREMIUM & LOCAL",
      backgroundImage: "https://images.unsplash.com/photo-1550258114-68bd2998ce9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      actions: [
        {
          text: "Commander sur WhatsApp",
          link: "/produits",
          style: "bg-primary-500 hover:bg-primary-600 text-white"
        },
        {
          text: "Explorer les régions",
          link: "/about",
          style: "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
        }
      ]
    },
    {
      title: "Produits 100% naturels et authentiques",
      description: "Directement des producteurs locaux, pour des saveurs inégalées et un commerce équitable.",
      badge: "BIO & LOCAL",
      backgroundImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      actions: [
        {
          text: "Découvrir nos produits",
          link: "/produits",
          style: "bg-primary-500 hover:bg-primary-600 text-white"
        }
      ]
    },
    {
      title: "Soutenez les producteurs guinéens",
      description: "Chaque achat contribue directement à l'économie rurale et à l'autonomie des communautés agricoles.",
      badge: "COMMERCE ÉQUITABLE",
      backgroundImage: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      actions: [
        {
          text: "Voir notre impact",
          link: "/about",
          style: "bg-primary-500 hover:bg-primary-600 text-white"
        },
        {
          text: "Devenir partenaire",
          link: "/contact",
          style: "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section avec Carrousel */}
      <section className="pt-20">
        <Carousel
          slides={carouselSlides}
          autoPlay={true}
          autoPlayInterval={5000}
        />
      </section>

      {/* Regions Section */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom text-center mb-16">
          <h2 className="heading-3 mb-4">Nos Régions, Nos Richesses</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => {
              // Définition des icônes et couleurs selon le design
              const iconConfig = [
                { bg: 'bg-sky-300', icon: '🔄' }, // Basse Guinée - bleu clair (carré bleu)
                { bg: 'bg-emerald-300', icon: '🌿' }, // Moyenne Guinée - vert clair (carré vert)
                { bg: 'bg-orange-400', icon: '☀️' }, // Haute Guinée - orange (carré orange)
                { bg: 'bg-green-700', icon: '🌳' }  // Guinée Forestière - vert foncé (carré vert foncé)
              ];

              const config = iconConfig[index];

              return (
                <Link
                  key={index}
                  to={`/region/${index + 1}`}
                  className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={region.backgroundImage}
                    alt={region.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay pour meilleure lisibilité du texte */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Icône carrée en haut à gauche */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center shadow-lg`}>
                      <span className="text-xl">{config.icon}</span>
                    </div>
                  </div>

                  {/* Texte en bas */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h3 className="text-xl font-bold mb-1 text-white">{region.name}</h3>
                    <p className="text-white/90 text-sm font-medium">{region.products} produits disponibles</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagements Section */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom text-center mb-16">
          <h2 className="heading-3 mb-4">Nos Engagements</h2>
          <p className="text-body max-w-2xl mx-auto text-lg">Plus qu'une plateforme, une vision durable pour l'excellence de notre terroir.</p>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagements.map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="text-5xl mb-4 inline-block">{item.icon}</div>
                <h3 className="heading-3 mb-3 text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="text-body leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="heading-3 mb-2">Produits Phares</h2>
            <p className="text-body">Directement de la ferme à votre table.</p>
          </div>
          <Link to="/produits" className="text-primary-500 hover:text-primary-600 font-bold flex items-center group transition-colors">
            Voir tout le catalogue
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight`}>
                    {product.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-2 text-base">{product.name}</h3>
                  <p className="text-body text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-neutral-900 dark:text-white">{product.price}</span>
                    <button className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 9M7 13l-1.8 9m0 0h9.6M16 13v9" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container-custom text-center mb-8">
          <h2 className="heading-3 mb-3">Parole aux Producteurs</h2>
          <p className="text-body max-w-2xl mx-auto">Rencontrez les hommes et les femmes qui cultivent avec passion les richesses de notre pays.</p>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Avatar with gradient ring */}
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-110`}></div>
                    <div className={`relative w-16 h-16 rounded-full p-1 bg-gradient-to-br ${t.gradient}`}>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full rounded-full object-cover border-3 border-white dark:border-neutral-800"
                      />
                    </div>
                  </div>

                  {/* Quote icon */}
                  <div className={`text-4xl mb-3 bg-gradient-to-br ${t.gradient} bg-clip-text text-transparent font-bold`}>"</div>

                  {/* Quote text */}
                  <p className="italic text-sm mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300 min-h-[60px]">
                    "{t.quote}"
                  </p>

                  {/* Author info */}
                  <div className="mt-auto pt-3 border-t border-neutral-200 dark:border-neutral-700 w-full">
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white mb-1">{t.name}</h4>
                    <p className={`text-xs font-semibold bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${t.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom text-center mb-16">
          <h2 className="heading-3 mb-4">Comment ça marche ?</h2>
          <p className="text-body text-lg">Un processus simple, rapide et sécurisé pour vos commandes.</p>
        </div>

        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
            <div className="absolute top-12 left-0 w-full h-0.5 bg-primary-200 dark:bg-primary-800 hidden md:block -z-0"></div>
            {steps.map((step, i) => (
              <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-2xl mb-6 shadow-lg relative z-10">
                  {step.icon}
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -z-0">
                  <span className="text-2xl font-bold text-primary-500 bg-white dark:bg-neutral-900 px-3">{i + 1}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">{step.title}</h3>
                <p className="text-body text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/produits" className="px-10 py-5 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold text-lg inline-block transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Commencer mon panier
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="heading-3 mb-2">Actualités & Blog</h2>
            <p className="text-body">Plongez au cœur de notre terroir et suivez nos impacts sur le terrain.</p>
          </div>
          <Link to="/blog" className="text-primary-500 hover:text-primary-600 font-bold flex items-center group transition-colors">
            Voir tous les articles
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <Link key={i} to="/blog" className="group cursor-pointer">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 shadow-soft">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase">
                    {post.badge}
                  </div>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-3 font-bold uppercase tracking-wide">{post.date}</p>
                <h3 className="font-bold text-lg mb-4 text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors">{post.title}</h3>
                <p className="text-body text-sm leading-relaxed mb-6 line-clamp-2">{post.description}</p>
                <span className="text-primary-500 font-bold flex items-center group-hover:underline">
                  Lire la suite →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 