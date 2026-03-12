import React, { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime?: string;
  views?: string;
}

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>('Tout');

  const tags = ['Tout', 'Agriculture', 'Artisanat', 'Impact Social'];

  // Démo dataset inspiré de la maquette
  const demoArticles: Article[] = [
    {
      id: 1,
      title:
        "L'excellence du Terroir Guinéen : Comment nos agriculteurs redéfinissent le luxe durable",
      excerpt:
        "Découvrez le parcours fascinant de bananes de Kindia, de la terre fertile de Guinée jusqu'aux tables les plus prestigieuses d'Europe.",
      content: '...',
      author: 'Moussa Camara',
      date: 'Aujourd\'hui',
      image:
        'https://images.unsplash.com/photo-1517248828377-6390d51f39a1?q=80&w=1470&auto=format&fit=crop',
      category: 'À LA UNE',
      readTime: '8 min de lecture',
      views: '12.4k vues',
    },
    {
      id: 2,
      title: "L'or noir de Guinée : Pourquoi le café Ziama est unique au monde",
      excerpt:
        "Plongez au cœur des montagnes de la Guinée Forestière pour découvrir le secret d'un café d'exception cultivé en altitude.",
      content: '...',
      author: 'Rokia Sy',
      date: 'Il y a 2 jours',
      image:
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1470&auto=format&fit=crop',
      category: 'Agriculture',
      readTime: '5 min',
      views: '2.4k vues',
    },
    {
      id: 3,
      title:
        'Leppi : Le tissage sacré des hauts plateaux du Fouta-Djallon',
      excerpt:
        "Symbole d'élégance et d'identité, le tissu Leppi traverse les âges tout en s'adaptant à la mode contemporaine.",
      content: '...',
      author: 'Ibrahima Bah',
      date: 'Il y a 5 jours',
      image:
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1470&auto=format&fit=crop',
      category: 'Artisanat',
      readTime: '6 min',
      views: '1.9k vues',
    },
    {
      id: 4,
      title:
        "Comment GuinéeMakiti transforme l'entrepreneuriat féminin rural",
      excerpt:
        'À travers la numérisation des ventes, des centaines de productrices accèdent désormais à un marché mondial.',
      content: '...',
      author: 'Equipe GuinéeMakiti',
      date: 'Semaine dernière',
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1470&auto=format&fit=crop',
      category: 'Impact Social',
      readTime: '7 min',
      views: '1.5k vues',
    },
    {
      id: 5,
      title: "La Poterie de Mafanco : Un héritage qui ne s'effrite jamais",
      excerpt:
        'L\'art de façonner l\'argile pour créer des ustensiles à la fois utilitaires et artistiques, fiers de notre culture.',
      content: '...',
      author: 'Binta Kaba',
      date: 'Il y a 10 jours',
      image:
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1470&auto=format&fit=crop',
      category: 'Artisanat',
      readTime: '4 min',
      views: '1.1k vues',
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      setArticles(demoArticles);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  const filtered =
    activeTag === 'Tout' ? articles : articles.filter((a) => a.category === activeTag);
  const featured = articles[0];
  const list = filtered.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero */}
        <section className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-2">
            <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden rounded-2xl shadow-sm">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6 md:p-8 text-white max-w-2xl">
                <span className="inline-block text-xs font-semibold tracking-wide bg-orange-500 text-white px-3 py-1 rounded-full mb-4">
                  {featured.category}
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow">
                  {featured.title}
                </h1>
                <p className="mt-3 md:mt-4 text-white/90 hidden md:block">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-sm text-white/90">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur" />
                  <span>{featured.author}</span>
                  <span className="opacity-80">•</span>
                  <span>{featured.readTime}</span>
                </div>
                <button className="mt-5 inline-flex items-center gap-2 bg-white text-neutral-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition">
                  LIRE L'ARTICLE
                  <span>➜</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`px-4 py-1.5 rounded-full border transition text-sm ${
                    activeTag === t
                      ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white'
                      : 'bg-white/80 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Grid articles */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {list.map((a) => (
                <article
                  key={a.id}
                  className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 hover:shadow-md transition"
                >
                  <div className="relative h-48 w-full">
                    <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide bg-orange-500 text-white px-2.5 py-1 rounded-full">
                      {a.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold dark:text-white line-clamp-2">{a.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">{a.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span>{a.author}</span>
                      <div className="flex items-center gap-2">
                        <span>{a.views}</span>
                        <span>•</span>
                        <span>{a.readTime}</span>
                      </div>
                    </div>
                    <button className="mt-4 text-orange-600 font-semibold text-sm inline-flex items-center gap-1">
                      LIRE LA SUITE <span>›</span>
                    </button>
                  </div>
                </article>
              ))}

              {/* Pagination (maquette simple) */}
              <div className="md:col-span-2 flex items-center justify-center gap-2 mt-2">
                <button className="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-neutral-600">1</button>
                <button className="w-9 h-9 rounded-full bg-orange-500 text-white">2</button>
                <button className="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-neutral-600">3</button>
                <button className="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-neutral-600">…</button>
                <button className="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-neutral-600">›</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Newsletter */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
              <h4 className="text-lg font-semibold dark:text-white">Rejoignez la Communauté</h4>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                Recevez chaque semaine nos dossiers exclusifs sur les trésors de la Guinée et les actualités de nos producteurs.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900"
                />
                <button className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold">S'ABONNER</button>
              </div>
            </div>

            {/* Articles les plus lus */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
              <h4 className="text-sm font-semibold text-neutral-500 tracking-wider">ARTICLES LES PLUS LUS</h4>
              <div className="mt-4 space-y-4">
                {articles.slice(1, 5).map((a) => (
                  <div key={a.id} className="flex items-center gap-3">
                    <img src={a.image} alt={a.title} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium dark:text-white line-clamp-2">{a.title}</p>
                      <p className="text-xs text-neutral-500">{a.views} • {a.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Catégories */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
              <h4 className="text-sm font-semibold text-neutral-500 tracking-wider">CATÉGORIES</h4>
              <ul className="mt-4 space-y-3">
                {[
                  { name: 'Agriculture Durable', count: 14 },
                  { name: 'Mode & Textile', count: 8 },
                  { name: 'Économie Sociale', count: 21 },
                  { name: 'Témoignages Clients', count: 12 },
                  { name: 'Recettes & Terroir', count: 5 },
                ].map((c) => (
                  <li key={c.name} className="flex items-center justify-between text-sm">
                    <span className="dark:text-neutral-200">{c.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs">
                      {c.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bannière */}
            <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-orange-500 to-orange-600">
              <h4 className="text-xl font-extrabold">100% AUTHENTIQUE</h4>
              <p className="mt-1 text-white/90">LE MEILLEUR DE LA GUINÉE CHEZ VOUS</p>
              <button className="mt-4 bg-white text-neutral-900 font-semibold px-4 py-2 rounded-lg">VOIR LA BOUTIQUE</button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Blog;
