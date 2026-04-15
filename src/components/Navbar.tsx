import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { User } from '../types';
import {
    FiHeart,
    FiMenu,
    FiMoon,
    FiShoppingCart,
    FiSun,
    FiUser,
    FiX
} from 'react-icons/fi';

const Navbar: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth() as { user: User | null; isAuthenticated: boolean; logout: () => void };
    const { itemCount } = useCart() as { itemCount: number };
    const { theme, toggleTheme } = useTheme() as { theme: 'light' | 'dark'; toggleTheme: () => void };
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const location = useLocation();

    const navLinks = useMemo(() => ([
        { name: 'ACCUEIL', path: '/' },
        { name: 'CATALOGUE', path: '/produits' },
        { name: 'A PROPOS', path: '/about' },
        { name: 'CONTACT', path: '/contact' }
    ]), []);
    const staticPaths = useMemo(() => ['/', '/about', '/contact'], []);
    const isPublicCatalogue = location.pathname === '/produits';
    const isPublicProductDetail = location.pathname.startsWith('/produit/');

    const isActive = (path: string) => location.pathname === path;
    const isStaticPage = staticPaths.includes(location.pathname);
    const hideCommerceActions = isPublicCatalogue || isPublicProductDetail;
    const showStaticGuestButtons = !isAuthenticated && isStaticPage;
    const showStaticUserButton = isAuthenticated && isStaticPage;

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mx-auto grid max-w-[1880px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:gap-6 lg:px-8">
                <div className="flex items-center gap-4 lg:gap-7">
                    <Link to="/" className="shrink-0" onClick={closeMenu}>
                        <img
                            src="/assets/logo.png"
                            alt="GuineeMakiti"
                            className="h-10 w-auto object-contain sm:h-11"
                        />
                    </Link>

                </div>

                <nav className="hidden items-center justify-center gap-10 xl:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-[13px] font-extrabold tracking-[0.04em] transition-colors ${
                                    isActive(link.path) ? 'text-primary-600 dark:text-orange-400' : 'text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-orange-400'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                </nav>

                <div className="ml-auto flex items-center justify-end gap-1 sm:gap-2 lg:gap-3">
                    <button
                        onClick={toggleTheme}
                        className="hidden h-10 w-10 items-center justify-center rounded-full text-[#d58a2f] transition-colors hover:bg-neutral-100 dark:text-orange-400 dark:hover:bg-neutral-800 sm:flex"
                        aria-label="Changer le theme"
                    >
                        {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={17} />}
                    </button>

                    {showStaticGuestButtons ? (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Link
                                to="/connexion"
                                className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-bold text-neutral-700 transition-colors hover:border-primary-600 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/inscription"
                                className="rounded-full bg-gradient-to-r from-primary-600 to-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:from-primary-700 hover:to-orange-600"
                            >
                                Inscription
                            </Link>
                        </div>
                    ) : showStaticUserButton ? (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Link
                                to="/dashboard"
                                className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-bold text-neutral-700 transition-colors hover:border-primary-600 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                            >
                                Mon compte
                            </Link>
                        </div>
                    ) : hideCommerceActions ? null : (
                        <>
                            <div className="relative hidden sm:block">
                                <Link
                                    to={isAuthenticated ? '/dashboard' : '/connexion'}
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-orange-400"
                                >
                                    <FiUser size={20} />
                                </Link>

                                {isAuthenticated && (
                                    <div className="invisible absolute right-0 top-full z-50 mt-3 w-56 translate-y-2 rounded-2xl border border-neutral-200 bg-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100" />
                                )}
                            </div>

                            <Link
                                to="/favoris"
                                className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-orange-400"
                            >
                                <FiHeart size={20} />
                                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-black text-white">
                                    0
                                </span>
                            </Link>

                            <Link
                                to="/panier"
                                className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-orange-400"
                            >
                                <FiShoppingCart size={20} />
                                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-black text-white">
                                    {itemCount}
                                </span>
                            </Link>
                        </>
                    )}

                    <button
                        onClick={() => setIsMenuOpen((value) => !value)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800 xl:hidden"
                        aria-label="Ouvrir le menu"
                    >
                        {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </div>

            <div className={`border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 xl:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="mx-auto flex max-w-[1880px] flex-col gap-5 px-4 py-5 sm:px-6">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={closeMenu}
                                className={`rounded-2xl px-4 py-4 text-sm font-extrabold tracking-[0.05em] transition-colors ${
                                    isActive(link.path)
                                        ? 'bg-orange-50 text-primary-600 dark:bg-orange-500/10 dark:text-orange-400'
                                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-orange-400'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-200"
                        >
                            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
                            <span>{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <Link
                                to={isAuthenticated ? '/dashboard' : '/connexion'}
                                onClick={closeMenu}
                                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-700 transition-colors hover:border-primary-600 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                            >
                                {isAuthenticated ? `${user?.prenom || 'Mon'} compte` : 'Connexion'}
                            </Link>
                            {isAuthenticated && (
                                <button
                                    onClick={logout}
                                    className="text-sm font-bold text-red-500"
                                >
                                    Deconnexion
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
