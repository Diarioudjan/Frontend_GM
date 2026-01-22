import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Articles de démonstration
  const demoArticles = [
    {
      id: 1,
      title: "L'artisanat guinéen : Un patrimoine à préserver",
      excerpt: "Découvrez la richesse de l'artisanat traditionnel guinéen et son importance dans notre culture.",
      content: "L'artisanat guinéen représente des siècles de savoir-faire transmis de génération en génération...",
      author: "Équipe GuineeMakiti",
      date: "2024-01-15",
      image: "/api/placeholder/600/300",
      category: "Culture"
    },
    {
      id: 2,
      title: "Comment choisir des produits artisanaux authentiques",
      excerpt: "Guide pratique pour reconnaître et sélectionner de véritables produits artisanaux guinéens.",
      content: "Choisir des produits artisanaux authentiques nécessite de connaître certains critères...",
      author: "Marie Camara",
      date: "2024-01-10",
      image: "/api/placeholder/600/300",
      category: "Guide"
    },
    {
      id: 3,
      title: "Nouveautés de la saison : Découvrez nos dernières créations",
      excerpt: "Explorez notre nouvelle collection d'objets artisanaux créés par nos artisans partenaires.",
      content: "Cette saison, nous sommes fiers de présenter de nouvelles créations exceptionnelles...",
      author: "Amadou Diallo",
      date: "2024-01-05",
      image: "/api/placeholder/600/300",
      category: "Nouveautés"
    }
  ];

  useEffect(() => {
    // Simulation du chargement des articles
    setTimeout(() => {
      setArticles(demoArticles);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20">
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-2 mb-4 text-white">
            Blog & Actualités
          </h1>
          <p className="text-body text-lg max-w-3xl mx-auto !text-white/90">
            Découvrez les dernières nouvelles, guides et histoires sur l'artisanat guinéen
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-neutral-400">{article.date}</span>
                </div>
                <h2 className="text-xl font-semibold dark:text-white mb-3 hover:text-primary-600 cursor-pointer">
                  {article.title}
                </h2>
                <p className="text-body mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-neutral-400">Par {article.author}</span>
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium text-sm">
                    Lire la suite →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-primary-600 dark:bg-primary-800 rounded-lg p-8 text-center">
          <h3 className="heading-3 text-white mb-4">
            Restez informé de nos actualités
          </h3>
          <p className="text-body text-primary-100 dark:text-primary-200 mb-6">
            Inscrivez-vous à notre newsletter pour recevoir les derniers articles et nouvelles
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-primary-300 dark:bg-neutral-800 dark:text-white"
            />
            <button className="bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
