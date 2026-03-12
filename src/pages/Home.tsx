import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { productService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

const Home: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

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

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await productService.getAllProducts();
                if (response && response.data?.products) {
                    setProducts(response.data.products.slice(0, 4));
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching homepage products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProducts();
    }, []);

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
        <div className="min-h-screen bg-white dark:bg-neutral-900 overflow-x-hidden">
            <section className="pt-20">
                {isAuthenticated ? (
                    <div className="relative py-24 px-8 lg:px-12 overflow-hidden bg-white dark:bg-neutral-900">
                        {/* Background Decor */}
                        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
                        </div>

                        <div className="max-w-7xl mx-auto">
                            <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl border border-white/20">
                                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                    <span className="text-8xl">🇬🇳</span>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                                    <div className="space-y-6 text-center lg:text-left flex-1">
                                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
                                            <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em]">Tableau de Bord Premium</span>
                                        </div>
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none italic">
                                            Bonjour, <br />
                                            <span className="text-primary-500 not-italic">{user?.prenom}</span>
                                        </h1>
                                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg font-medium mx-auto lg:mx-0">
                                            Découvrez les dernières récoltes et soutenez nos producteurs locaux en direct.
                                        </p>
                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                                            <button
                                                onClick={() => navigate('/produits')}
                                                className="px-8 py-4 bg-primary-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-soft-orange hover:scale-105 transition-all active:scale-95 font-bold"
                                            >
                                                Explorer bio
                                            </button>
                                            <button
                                                onClick={() => navigate('/dashboard?tab=orders')}
                                                className="px-8 py-4 glass-effect text-neutral-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/90 dark:hover:bg-white/10 transition-all active:scale-95 font-bold"
                                            >
                                                Mes Commandes
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Grid */}
                                    <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                                        {[
                                            { label: 'Panier', icon: '🛒', link: '/panier', color: 'bg-emerald-500/5 hover:bg-emerald-500/10' },
                                            { label: 'Favoris', icon: '❤️', link: '/dashboard?tab=wishlist', color: 'bg-rose-500/5 hover:bg-rose-500/10' },
                                            { label: 'Profil', icon: '👤', link: '/dashboard?tab=profile', color: 'bg-sky-500/5 hover:bg-sky-500/10' },
                                            { label: 'Support', icon: '📞', link: '/support', color: 'bg-amber-500/5 hover:bg-amber-500/10' }
                                        ].map((box, i) => (
                                            <button
                                                key={i}
                                                onClick={() => navigate(box.link)}
                                                className={`group ${box.color} border border-neutral-100 dark:border-white/5 p-6 md:p-8 rounded-3xl text-left hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm min-w-[140px] md:min-w-[180px]`}
                                            >
                                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{box.icon}</div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500 transition-colors">{box.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Carousel
                        slides={carouselSlides}
                        autoPlay={true}
                        autoPlayInterval={5000}
                    />
                )}
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
                            const iconConfig = [
                                { bg: 'bg-sky-300', icon: '🔄' },
                                { bg: 'bg-emerald-300', icon: '🌿' },
                                { bg: 'bg-orange-400', icon: '☀️' },
                                { bg: 'bg-green-700', icon: '🌳' }
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center shadow-lg`}>
                                            <span className="text-xl">{config.icon}</span>
                                        </div>
                                    </div>
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
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {product.images?.[0] ? (
                                            <img src={product.images[0]} alt={product.nom} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <span className="text-4xl">📦</span>
                                        )}
                                        <div className={`absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight`}>
                                            {product.region || 'Guinée'}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-neutral-900 dark:text-white mb-2 text-base line-clamp-1">{product.nom}</h3>
                                        <p className="text-body text-sm mb-4 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-neutral-900 dark:text-white">{product.prix?.toLocaleString()} GNF</span>
                                            <Link to={`/produit/${product._id}`} className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 9M7 13l-1.8 9m0 0h9.6M16 13v9" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                                <div className="relative z-10 flex flex-col items-center text-center">
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
                                    <div className={`text-4xl mb-3 bg-gradient-to-br ${t.gradient} bg-clip-text text-transparent font-bold`}>"</div>
                                    <p className="italic text-sm mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300 min-h-[60px]">
                                        "{t.quote}"
                                    </p>
                                    <div className="mt-auto pt-3 border-t border-neutral-200 dark:border-neutral-700 w-full">
                                        <h4 className="font-bold text-base text-neutral-900 dark:text-white mb-1">{t.name}</h4>
                                        <p className={`text-xs font-semibold bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
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
