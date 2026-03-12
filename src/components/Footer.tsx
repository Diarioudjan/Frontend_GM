import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { name: 'Nos produits', path: '/produits' },
            { name: 'À propos', path: '/about' },
            { name: 'Contact', path: '/contact' },
        ],
        support: [
            { name: 'Mes commandes', path: '/commandes' },
            { name: 'Mes favoris', path: '/favoris' },
        ],
        legal: [
            { name: 'Vendre', path: '/inscription' },
        ]
    };

    return (
        <footer className="bg-neutral-950 text-white font-sans overflow-hidden relative border-t border-neutral-800">
            {/* Ambient Background Decor */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
                {/* Upper Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-800">
                    <div className="lg:col-span-5 flex flex-col items-start">
                        <Link to="/" className="flex items-center gap-3 group mb-6">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg p-2 transition-transform duration-300 group-hover:scale-105">
                                <img src="/assets/logo.png" alt="GuinéeMakiti Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white">
                                Guinée<span className="text-orange-500">Makiti</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-8 font-medium">
                            L'excellence du terroir guinéen à portée de clic. Nous connectons le monde à l'authenticité de nos régions à travers des produits d'exception.
                        </p>
                        <div className="flex gap-3">
                            {['FB', 'IG', 'TW', 'LI'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 shadow-sm"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 lg:pl-10">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 relative z-10">Inscrivez-vous à la gazette</h3>
                            <p className="text-neutral-400 text-sm mb-6 relative z-10">
                                Découvrez nos nouveaux arrivages, nos offres exclusives et les histoires fascinantes de nos producteurs locaux.
                            </p>

                            <form className="relative flex flex-col sm:flex-row gap-3 items-center max-w-md z-10" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3.5 px-5 text-sm text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-600 shadow-inner"
                                />
                                <button type="submit" className="w-full sm:w-auto flex-shrink-0 bg-orange-500 hover:bg-orange-400 text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all">
                                    S'inscrire
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Exploration</h4>
                        <ul className="space-y-3.5">
                            {footerLinks.navigation.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors flex items-center group font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Assistance</h4>
                        <ul className="space-y-3.5">
                            {footerLinks.support.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors flex items-center group font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Légal</h4>
                        <ul className="space-y-3.5">
                            {footerLinks.legal.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors flex items-center group font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3 text-neutral-400">
                                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Siège Social</p>
                                    <p className="text-sm font-medium">Cité de l'Air, Conakry, Guinée</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-neutral-400">
                                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">WhatsApp Business</p>
                                    <p className="text-sm font-medium">+224 620 00 00 00</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-neutral-400">
                                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-sm font-medium">contact@guineemakiti.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Lower Section: Copyright */}
                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm font-medium text-neutral-500">
                        &copy; {currentYear} GuinéeMakiti. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-white uppercase tracking-widest px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
                            Fièrement Guinéen 🇬🇳
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
