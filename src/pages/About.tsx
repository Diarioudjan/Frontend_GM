import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  };

  const fadeRight = {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeLeft = {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-neutral-950 pt-24 pb-20 font-sans selection:bg-orange-500/30 overflow-hidden">

      {/* Background Decor Elements */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">

        {/* --- HERO SECTION --- */}
        <motion.section
          {...fadeInUp}
          className="relative pt-12 pb-20 md:pt-20 md:pb-28 text-center"
        >
          <div className="max-w-4xl mx-auto space-y-8 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-orange-600 dark:text-orange-400 uppercase">Manifeste GuinéeMakiti</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white leading-[1.05] tracking-tight">
              L'essence du <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">terroir guinéen.</span>
            </h1>

            <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Plus qu'une plateforme e-commerce, GuinéeMakiti est le pont luxueux reliant le savoir-faire ancestral de la Guinée aux palais du monde entier.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/produits" className="w-full sm:w-auto px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300">
                Explorer le Catalogue
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 font-bold text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                Devenir Partenaire
              </Link>
            </div>
          </div>

          <div className="mt-16 md:mt-24 relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1615886751211-1da3ab9b6748?q=80&w=2670&auto=format&fit=crop"
                alt="Terroir Guinéen"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
            </div>
          </div>
        </motion.section>

        {/* --- NOTRE VISION / HISTOIRE --- */}
        <section className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeRight} className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-4">
              <span className="w-12 h-px bg-orange-500"></span>
              <span className="text-[10px] md:text-xs font-bold text-orange-500 tracking-[0.2em] uppercase">Notre Histoire</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white leading-[1.1] tracking-tight">
              Sublimer l'héritage d'une nation d'artisans.
            </h2>
            <div className="space-y-4 text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
              <p>
                L'aventure GuinéeMakiti est née d'une vision audacieuse : rendre au "Made in Guinea" ses lettres de noblesse européennes et internationales.
              </p>
              <p>
                Nous travaillons en circuit ultra-court avec plus de 150 artisans et coopératives. De la sélection rigoureuse des matières premières jusqu'à l'emballage éco-responsable, chaque étape de notre chaîne de valeur est guidée par l'excellence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div>
                <p className="text-3xl font-black text-neutral-900 dark:text-white mb-1">150+</p>
                <p className="text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest">Créateurs</p>
              </div>
              <div>
                <p className="text-3xl font-black text-neutral-900 dark:text-white mb-1">4</p>
                <p className="text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest">Régions couvertes</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeLeft} className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-6 translate-y-12">
                <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1370&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Culture Guinéenne" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=80&w=1374&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Artisanat Guinéen" />
                </div>
                <div className="bg-orange-500 text-white rounded-[2rem] p-8 shadow-xl">
                  <svg className="w-8 h-8 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  <p className="text-lg font-bold leading-snug">"Notre ambition est de faire de chaque produit guinéen un standard de luxe international."</p>
                </div>
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </section>

        {/* --- PILIERS / VALEURS --- */}
        <section className="space-y-12">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] md:text-xs font-bold text-orange-500 tracking-[0.2em] uppercase">Notre Philosophie</span>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">Les 3 Piliers GuinéeMakiti</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Commerce Inspiré',
                desc: 'Nous garantissons une rémunération plus que juste à nos coopératives, structurant ainsi une croissance pérenne à la base.',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
              },
              {
                title: 'Qualité Sans Concession',
                desc: 'De la terre forestière à votre porte, notre chaîne de contrôle impose des standards dignes de la grande distribution sélective.',
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
              },
              {
                title: 'Héritage Préservé',
                desc: 'Nos produits ne se consomment pas, ils se comprennent. Nous préservons un savoir-faire en le modernisant.',
                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              },
            ].map((v, i) => (
              <motion.div key={v.title} variants={fadeInUp} className="group p-6 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-[1rem] flex items-center justify-center text-neutral-900 dark:text-white mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={v.icon} /></svg>
                </div>
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">{v.title}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- L'EQUIPE (NOUVEAU) --- */}
        <section className="relative py-20">
          {/* Background pour section équipe */}
          <div className="absolute inset-0 bg-neutral-900 dark:bg-neutral-950 rounded-[3rem] -z-20" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 rounded-[3rem] -z-10" />

          <div className="px-6 md:px-12 py-10">
            <motion.div {...fadeInUp} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 text-white">
              <div className="max-w-xl">
                <span className="text-[10px] md:text-xs font-bold text-orange-500 tracking-[0.2em] uppercase mb-3 block">Les Visages</span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">Une équipe passionnée.</h2>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { name: "Fatoumata Barry", role: "CEO & Fondatrice", img: "https://images.unsplash.com/photo-1531123897727-8f129e1ebfa8?q=80&w=1374&auto=format&fit=crop" },
                { name: "Ibrahima Diallo", role: "Directeur Sourcing", img: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1335&auto=format&fit=crop" },
                { name: "Aissatou Sylla", role: "Responsable Qualité", img: "https://images.unsplash.com/photo-1554727242-741c14fa561c?q=80&w=1374&auto=format&fit=crop" }
              ].map((member, i) => (
                <motion.div key={i} variants={fadeInUp} className="group text-center">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] mb-4 shadow-lg">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-60" />
                  </div>
                  <h4 className="text-lg font-black text-white">{member.name}</h4>
                  <p className="text-orange-400 font-bold uppercase tracking-widest text-[10px] mt-1.5">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <motion.section
          {...fadeInUp}
          className="relative rounded-[3rem] bg-orange-500 text-white overflow-hidden text-center shadow-max shadow-orange-500/20"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=1374&auto=format&fit=crop')] opacity-10 object-cover" />

          <div className="relative z-10 px-6 py-16 md:py-24">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-[10px] md:text-xs tracking-widest uppercase mb-6 border border-white/30">
              Passez à l'action
            </span>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-8 max-w-3xl mx-auto leading-tight">
              Faites partie du mouvement GuinéeMakiti dès aujourd'hui.
            </h3>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/produits" className="px-6 py-3.5 rounded-full bg-neutral-950 text-white font-bold tracking-widest text-xs uppercase hover:bg-neutral-800 transition-all shadow-xl hover:-translate-y-0.5">
                Découvrir la collection
              </Link>
              <Link to="/contact" className="px-6 py-3.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-bold tracking-widest text-xs uppercase hover:bg-white/20 transition-all hover:-translate-y-0.5">
                Devenir Partenaire
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
