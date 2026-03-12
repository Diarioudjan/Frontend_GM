import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { User } from '../types';

const Navbar: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth() as { user: User | null; isAuthenticated: boolean; logout: () => void };
    const { itemCount } = useCart() as { itemCount: number };
    const { theme, toggleTheme } = useTheme() as { theme: 'light' | 'dark'; toggleTheme: () => void };
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<'content' | 'account' | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Produits', path: '/produits' },
        { name: 'À Propos', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled
            ? 'py-3 bg-white/80 dark:bg-black/70 backdrop-blur-2xl shadow-premium border-b border-white/20 dark:border-white/5'
            : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-3 group perspective-1000">
                    <div className="relative h-12 lg:h-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <img src="/assets/logo.png" alt="GuinéeMakiti" className="h-full w-auto object-contain drop-shadow-glow" />
                    </div>
                </Link>

                {/* Desktop Menu - Modern Minimalist */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 hover:text-primary-500 ${isActive(link.path) ? 'text-primary-500' : 'text-neutral-900 dark:text-neutral-300'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary-500 transition-all duration-500 ${isActive(link.path) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'}`}></span>
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4 lg:space-x-8">
                    {/* Theme Switcher Premium */}
                    <button
                        onClick={toggleTheme}
                        className="group relative p-2 rounded-2xl glass-effect border border-neutral-200/50 dark:border-white/5 transition-all duration-500 hover:bg-white dark:hover:bg-white/10"
                        aria-label="Toggle Theme"
                    >
                        <div className="relative h-6 w-6 overflow-hidden">
                            <div className={`transition-all duration-700 transform ${theme === 'dark' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                                <span className="text-xl">☀️</span>
                            </div>
                            <div className={`absolute inset-0 transition-all duration-700 transform ${theme === 'light' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                                <span className="text-xl">🌙</span>
                            </div>
                        </div>
                    </button>

                    {/* Cart with Premium Badge */}
                    <Link to="/panier" className="group relative p-2.5 rounded-2xl glass-effect border border-neutral-200/50 dark:border-white/5 transition-all duration-500 hover:rotate-6 hover:scale-110">
                        <span className="text-2xl">🛒</span>
                        {itemCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-primary-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1.5 shadow-glow animate-pulse-gentle">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* User Profile / Auth Toggle */}
                    <div className="hidden lg:block">
                        {isAuthenticated ? (
                            <div className="relative group/dropdown">
                                <button className="flex items-center space-x-3 glass-card px-4 py-2 rounded-2xl border border-primary-500/10 hover:border-primary-500/30 transition-all duration-500">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-black text-xs shadow-lg">
                                        {user?.prenom?.[0] || 'U'}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white">
                                        {user?.prenom}
                                    </span>
                                </button>

                                {/* Premium Dropdown */}
                                <div className="absolute top-full right-0 mt-3 w-64 opacity-0 invisible translate-y-4 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-500 z-50">
                                    <div className="glass-card p-2 rounded-3xl border border-white/20 shadow-2xl overflow-hidden backdrop-blur-3xl bg-white/90 dark:bg-black/90">
                                        <div className="p-4 border-b border-neutral-100 dark:border-white/5 mb-2">
                                            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Session active</p>
                                            <p className="text-xs font-black text-neutral-900 dark:text-white truncate">{user?.email}</p>
                                        </div>
                                        <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-primary-500/5 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors">
                                            <span className="text-lg">🏚️</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Mon Dashboard</span>
                                        </Link>
                                        {(user?.role === 'vendeur' || user?.role === 'admin') && (
                                            <Link to="/vendor/dashboard" className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-amber-500/5 text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors">
                                                <span className="text-lg">🏪</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Espace Vendeur</span>
                                            </Link>
                                        )}
                                        <div className="my-2 border-t border-neutral-100 dark:border-white/5"></div>
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-red-500/5 text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            <span className="text-lg">🚪</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-left">Déconnexion</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/connexion"
                                className="bg-primary-500 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-soft-orange hover:scale-105 active:scale-95 transition-all block"
                            >
                                Connexion
                            </Link>
                        )}
                    </div>

                    {/* Mobile Burger - Refined */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2.5 rounded-2xl glass-effect border border-neutral-200 dark:border-white/5"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between items-end">
                            <span className={`h-[2px] bg-neutral-900 dark:bg-white transition-all duration-500 ${isMenuOpen ? 'w-full rotate-45 translate-y-2' : 'w-full'}`}></span>
                            <span className={`h-[2px] bg-neutral-900 dark:bg-white transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'w-2/3'}`}></span>
                            <span className={`h-[2px] bg-neutral-900 dark:bg-white transition-all duration-500 ${isMenuOpen ? 'w-full -rotate-45 -translate-y-2' : 'w-full'}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Reveal */}
            <div className={`lg:hidden fixed inset-0 z-[-1] transition-all duration-700 pointer-events-none ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                <div className="absolute inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-3xl p-8 pt-32 pointer-events-auto">
                    <div className="flex flex-col space-y-8">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter italic border-b border-neutral-100 dark:border-white/5 pb-4 flex justify-between items-center group"
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <span>{link.name}</span>
                                <span className="text-2xl text-primary-500 group-hover:translate-x-2 transition-transform">→</span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-20">
                        {!isAuthenticated ? (
                            <div className="grid grid-cols-2 gap-4">
                                <Link to="/connexion" onClick={() => setIsMenuOpen(false)} className="bg-neutral-100 dark:bg-white/5 text-center py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest">Se Connecter</Link>
                                <Link to="/inscription" onClick={() => setIsMenuOpen(false)} className="bg-primary-500 text-white text-center py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-soft-orange">S'inscrire</Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-6 glass-card p-6 rounded-[2.5rem]">
                                <div className="w-16 h-16 rounded-3xl bg-primary-500 flex items-center justify-center text-3xl shadow-xl">
                                    {user?.prenom?.[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-1">{user?.prenom} {user?.nom}</h3>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Me déconnecter</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
