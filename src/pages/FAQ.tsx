import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
    const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Toutes');

    const toggleItem = (id: number) => {
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
            answer: "Pour passer une commande, parcourez notre catalogue d'exception, ajoutez les produits souhaités à votre panier, puis suivez les étapes de commande ludiques et sécurisées. Vous devrez créer un compte ou vous connecter pour finaliser votre achat avec un suivi optimal."
        },
        {
            id: 2,
            category: "Commandes",
            question: "Puis-je modifier ou annuler ma commande ?",
            answer: "Vous pouvez modifier ou annuler votre commande dans les 2 heures qui suivent sa validation. Après ce délai, notre circuit d'expédition s'active afin de vous livrer le plus rapidement possible. N'hésitez pas à solliciter notre équipe support dans ce cas limite."
        },
        {
            id: 3,
            category: "Livraison",
            question: "Quels sont les délais de livraison ?",
            answer: "Nos délais varient de manière transparente selon votre lieu de résidence : 2-3 jours ouvrés pour Conakry intra-muros, 3-5 jours pour les autres villes de la région guinéenne, et jusqu'à 7-14 jours pour nos envois à l'international."
        },
        {
            id: 4,
            category: "Livraison",
            question: "Livrez-vous à l'international ?",
            answer: "Oui, la magie GuineeMakiti s'exporte dans le monde entier ! Nos tarifs d'acheminement sont calculés de façon automatique en fonction de la destination cible et du poids de votre panier, lors de la finalisation."
        },
        {
            id: 5,
            category: "Paiement",
            question: "Quels modes de paiement acceptez-vous ?",
            answer: "Pour garantir votre sérénité, nous proposons un éventail de paiements modernes et sécurisés : les cartes bancaires certifiées (Visa, Mastercard), les options de paiement mobile leaders (Orange Money, MTN Mobile Money), et un paiement à la livraison sur des zones métropolitaines ciblées."
        },
        {
            id: 6,
            category: "Paiement",
            question: "Mes informations de paiement sont-elles sécurisées ?",
            answer: "Absolument. Nous appliquons les derniers standards de bout en bout, avec un cryptage SSL exigeant et collaborons étroitement avec des passerelles de paiement de renommée internationale. Vos informations demeurent strictement confidentielles."
        },
        {
            id: 7,
            category: "Produits",
            question: "Vos produits portent-ils une garantie d'authenticité ?",
            answer: "L'authenticité est le credo de GuineeMakiti. Chacun de nos produits est façonné par des maîtres artisans et agricultrices guinéens que nous certifions, accompagnés dans certains cas de brevets ou labels garants du terroir d'une rare noblesse."
        },
        {
            id: 8,
            category: "Produits",
            question: "Puis-je retourner un produit qui ne me convient plus ?",
            answer: "Oui, votre satisfaction reste notre cap. Vous disposez de 14 jours légaux pour opérer un retour d'un produit non altéré et non personnalisé conditionné dans son état natif. Les frais de trajet restent à votre charge hors constat de vice."
        },
        {
            id: 9,
            category: "Compte",
            question: "Comment adhérer à l'expérience GuineeMakiti ?",
            answer: "Sélectionnez l'option flamboyante 'Créer un compte' nichée au sommet de la page d'accueil. Dédiez quelques secondes pour remplir notre formulaire digital ergonomique, puis validez ce dernier."
        },
        {
            id: 10,
            category: "Compte",
            question: "J'ai égaré mon mot de passe. Quel est le processus ?",
            answer: "Aucune inquiétude, il vous suffit de cliquer sur 'Mot de passe oublié ?' dans le module de connexion. Fournissez votre courriel : nos systèmes vous achemineront instantanément un lien de réinitialisation performant."
        }
    ];

    const categories = ['Toutes', ...new Set(faqData.map(item => item.category))];

    const filteredFaqs = faqData.filter(faq => {
        const matchCategory = activeCategory === 'Toutes' || faq.category === activeCategory;
        const matchSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-900 pt-20 font-sans selection:bg-orange-500/30 pb-20">
            {/* Header / Hero Section */}
            <div className="relative pt-12 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900 z-0" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920')] opacity-20 object-cover z-0 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent z-0" />

                {/* Decorative glows */}
                <div className="absolute left-1/4 -top-24 w-96 h-96 bg-orange-600/30 rounded-full blur-[100px] z-0" />
                <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] z-0" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs tracking-widest uppercase mb-6">
                            Assistance & Support
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                            Comment pouvons-nous <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">vous aider ?</span>
                        </h1>
                        <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
                            Découvrez les réponses aux questions les plus fréquentes de la communauté. Notre équipe est dédiée à vous offrir l'expérience la plus fluide qui soit.
                        </p>
                    </motion.div>

                    {/* Search Bar positioned overlaying the hero and body */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-3xl mx-auto mt-12 transform translate-y-8"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl group-hover:bg-orange-500/30 transition-all duration-300" />
                            <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-700 flex items-center p-2 transition-all group-hover:border-orange-200 dark:group-hover:border-orange-500/30">
                                <span className="pl-4 text-orange-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Rechercher une question (ex: Livraison, Produits...)"
                                    className="w-full px-4 py-4 bg-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-400 font-medium text-lg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-12 flex flex-wrap justify-center gap-3"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 -translate-y-0.5'
                                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700 hover:border-orange-200 hover:shadow-md'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`bg-white dark:bg-neutral-800 rounded-2xl border transition-all duration-300 overflow-hidden ${openItems[item.id]
                                            ? 'border-orange-200 dark:border-orange-500/30 shadow-lg shadow-orange-500/5'
                                            : 'border-gray-100 dark:border-neutral-700 shadow-sm hover:border-orange-100 dark:hover:border-neutral-600'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className="w-full px-6 md:px-8 py-5 text-left flex items-start justify-between focus:outline-none group"
                                    >
                                        <div className="pr-6">
                                            <span className={`text-xs font-bold tracking-widest uppercase mb-2 inline-block transition-colors ${openItems[item.id] ? 'text-orange-500' : 'text-neutral-400 group-hover:text-orange-400'
                                                }`}>
                                                {item.category}
                                            </span>
                                            <h3 className={`text-lg font-bold transition-colors ${openItems[item.id] ? 'text-neutral-900 dark:text-white' : 'text-neutral-800 dark:text-neutral-200 group-hover:text-orange-600 dark:group-hover:text-orange-400'
                                                }`}>
                                                {item.question}
                                            </h3>
                                        </div>
                                        <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openItems[item.id]
                                                ? 'bg-orange-500 text-white transform rotate-180'
                                                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 group-hover:bg-orange-100 group-hover:text-orange-500'
                                            }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {openItems[item.id] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 md:px-8 pb-6 text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                                                    <div className="h-px w-full bg-gradient-to-r from-gray-100 to-transparent dark:from-neutral-700 mb-4" />
                                                    {item.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16 bg-white dark:bg-neutral-800 rounded-3xl border border-dashed border-gray-300 dark:border-neutral-700"
                            >
                                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Aucun résultat trouvé</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">Nous n'avons pas trouvé de question correspondant à "{searchQuery}". Essayez d'autres mots-clés ou consultez une autre catégorie.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Contact Support */}
                <motion.div
                    {...fadeInUp}
                    className="mt-16 sm:mt-24 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-500/10 dark:to-emerald-500/5 p-10 md:p-14 text-center border border-orange-100 dark:border-orange-500/20 shadow-xl shadow-orange-500/5"
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-orange-500">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight">
                            Vous n'avez pas trouvé votre réponse ?
                        </h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 font-medium">
                            Notre équipe de support humaine et bienveillante est à votre écoute pour lever le moindre doute.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all">
                                Contacter le Support
                            </button>
                            <button className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-700 px-8 py-4 rounded-xl font-bold hover:border-orange-200 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all shadow-sm">
                                Envoyer un Email
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
