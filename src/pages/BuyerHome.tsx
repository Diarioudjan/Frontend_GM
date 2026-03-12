import React from 'react';
import { Link } from 'react-router-dom';

const BuyerHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 space-y-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl h-[360px] md:h-[440px]">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
            alt="Paysage agricole en Guinée"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
          <div className="relative h-full flex items-center p-6 md:p-10">
            <div className="max-w-2xl text-white">
              <p className="text-[10px] md:text-xs font-black tracking-[0.25em] opacity-90">100% ORGANIQUE & ARTISANAL</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                Le meilleur de la <br className="hidden md:block" />
                Guinée, <span className="text-orange-400">livré</span> <br className="hidden md:block" />
                chez vous
              </h1>
              <p className="mt-4 text-white/90 max-w-xl">
                Soutenez les artisans locaux et découvrez des produits biologiques d'exception, sourcés directement du Fouta-Djalon à la Guinée Forestière.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/produits"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow"
                >
                  Parcourir la boutique <span className="ml-2">➜</span>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/95 hover:bg-white text-neutral-900 font-semibold"
                >
                  Notre Histoire
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🛡️', title: 'Paiement Sécurisé', text: 'Transactions 100% protégées' },
            { icon: '🚚', title: 'Livraison Mondiale', text: "En Guinée & à l'international" },
            { icon: '🏷️', title: 'Sourcing Direct', text: 'Impact direct sur les producteurs' },
          ].map((f, i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-200 dark:border-neutral-700 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">{f.title}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{f.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Catégories */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Nos Catégories</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Explorez la richesse de notre terroir</p>
            </div>
            <Link to="/produits" className="text-sm font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
              Voir tout <span>›</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: 'Agriculture',
                tag: 'TERROIR',
                image:
                  'https://images.unsplash.com/photo-1514517220035-129cc2dbe8d5?q=80&w=1470&auto=format&fit=crop',
                link: '/categorie/agriculture',
              },
              {
                name: 'Artisanat',
                tag: 'SAVOIR-FAIRE',
                image:
                  'https://images.unsplash.com/photo-1526404079162-8fa7d57a7c33?q=80&w=1470&auto=format&fit=crop',
                link: '/categorie/artisanat',
              },
              {
                name: 'Textiles',
                tag: 'MODE & MAISON',
                image:
                  'https://images.unsplash.com/photo-1577909687380-4bb7b6a1f3c2?q=80&w=1470&auto=format&fit=crop',
                link: '/categorie/textiles',
              },
              {
                name: 'Cosmétiques',
                tag: 'BEAUTÉ NATURELLE',
                image:
                  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1470&auto=format&fit=crop',
                link: '/categorie/cosmetiques',
              },
            ].map((c) => (
              <Link key={c.name} to={c.link} className="group relative h-56 rounded-2xl overflow-hidden block">
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="text-[10px] font-black tracking-widest text-white/80">{c.tag}</p>
                  <h3 className="text-xl font-extrabold leading-tight">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">L'histoire derrière nos produits</h3>
              <p className="mt-2 text-white/90 max-w-xl">
                Abonnez-vous pour recevoir des portraits d'artisans, des recettes traditionnelles et nos nouvelles collections en avant-première.
              </p>
              <div className="mt-5 flex gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2.5 rounded-xl border-0 text-neutral-900 focus:ring-2 focus:ring-emerald-300"
                />
                <button className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold">S'inscrire</button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-3">
                <img
                  src="https://images.unsplash.com/photo-1634463526796-3838fc6e5b47?q=80&w=1370&auto=format&fit=crop"
                  alt="Carte produit héritage"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuyerHome;
