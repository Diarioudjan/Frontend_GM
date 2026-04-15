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
            { name: 'Vendre sur Makiti', path: '/inscription' },
        ]
    };

    return (
        <footer className="bg-neutral-950 text-white font-sans overflow-hidden relative border-t border-neutral-900">
            {/* Ambient Background Decor */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
                {/* Upper Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-800">
                    <div className="lg:col-span-5 flex flex-col items-start">
                        <Link to="/" className="flex items-center gap-3 group mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 transition-transform duration-300 group-hover:scale-105">
                                <img src="/assets/logo.png" alt="GuinéeMakiti Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white transition-colors group-hover:text-primary-500">
                                Guinée<span className="text-primary-600">Makiti</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-8 font-medium">
                            L'excellence guinéenne à portée de clic. Nous connectons le monde à l'authenticité de nos terroirs à travers une expérience e-commerce premium.
                        </p>
                        <div className="flex gap-3">
                            {['FB', 'IG', 'TW', 'LI'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] font-black text-neutral-400 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 shadow-sm"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 lg:pl-10">
                        <div className="bg-neutral-950 border border-neutral-800 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-125 transition-transform duration-1000"></div>

                            <h3 className="text-xl md:text-3xl font-black text-white mb-3 relative z-10 tracking-tight">Rejoignez la Gazette</h3>
                            <p className="text-neutral-400 text-sm mb-8 relative z-10 font-medium max-w-md">
                                Soyez les premiers au courant des nouveaux arrivages et des offres exclusives.
                            </p>

                            <form className="relative flex flex-col sm:flex-row gap-3 items-center z-10" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-neutral-600 shadow-inner"
                                />
                                <button type="submit" className="w-full sm:w-auto flex-shrink-0 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-600/20 active:scale-95 transition-all">
                                    S'abonner
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
                    <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8 opacity-40">Exploration</h4>
                        <ul className="space-y-4">
                            {footerLinks.navigation.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-primary-500 transition-all flex items-center group font-bold">
                                        <span className="w-1 h-1 rounded-full bg-primary-500 mr-2 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8 opacity-40">Assistance</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-primary-500 transition-all flex items-center group font-bold">
                                        <span className="w-1 h-1 rounded-full bg-primary-500 mr-2 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8 opacity-40">Légal</h4>
                        <ul className="space-y-4">
                            {footerLinks.legal.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-primary-500 transition-all flex items-center group font-bold">
                                        <span className="w-1 h-1 rounded-full bg-primary-500 mr-2 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8 opacity-40">Contact Rapide</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-neutral-400">
                                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-primary-500 shadow-sm">📍</div>
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Siège Social</p>
                                    <p className="text-xs font-medium">Cité de l'Air, Conakry, Guinée</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-neutral-400">
                                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shadow-sm">💬</div>
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">WhatsApp Business</p>
                                    <p className="text-xs font-medium">+224 620 00 00 00</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Lower Section: Copyright */}
                <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        &copy; {currentYear} GuinéeMakiti. Conçu avec passion 🇬🇳
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:text-primary-500 cursor-pointer transition-colors">Politique de Confidentialité</span>
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:text-primary-500 cursor-pointer transition-colors">CGV</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;



