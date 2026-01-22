import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
      ? 'bg-neutral-50/90 dark:bg-neutral-900/85 backdrop-blur-md shadow-medium'
      : 'bg-neutral-50/75 dark:bg-neutral-900/70 backdrop-blur-md'
      }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group transition-transform duration-200 hover:scale-105">
            <div className="flex items-center space-x-3">
              <img src="/assets/logo.png" alt="GuinéeMakiti" className="h-16 lg:h-20 w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            {!isAuthenticated && (
              <>
                <Link to="/" className="nav-link">
                  Accueil
                </Link>
                <Link to="/about" className="nav-link">
                  À propos
                </Link>
              </>
            )}

            <Link to="/produits" className="nav-link">
              Produits
            </Link>

            {!isAuthenticated && (
              <>
                {/* Menu déroulant Contenu */}
                <div className="relative"
                  onMouseEnter={() => setDropdownOpen('content')}
                  onMouseLeave={() => setDropdownOpen(null)}>
                  <button className="nav-link flex items-center">
                    Contenu
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropdownOpen === 'content' && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-48 z-50">
                      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 py-2">
                        <Link to="/blog" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">Blog</Link>
                        <Link to="/faq" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">FAQ</Link>
                        <Link to="/support" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">Support</Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Desktop Navigation - Right (Cart & Account) */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 text-neutral-600 dark:text-neutral-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <Link to="/panier" className="nav-link relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" title="Mon panier">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Menu déroulant Compte */}
            {/* Menu Compte / Connexion */}
            {isAuthenticated ? (
              <div className="relative"
                onMouseEnter={() => setDropdownOpen('account')}
                onMouseLeave={() => setDropdownOpen(null)}>
                <button className="nav-link flex items-center">
                  {user?.prenom || 'Compte'}
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen === 'account' && (
                  <div className="absolute top-full right-0 pt-2 w-48 z-50">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 py-2">
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-neutral-700">
                        {user?.prenom} {user?.nom}
                      </div>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">Tableau de bord</Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
                          Administration
                        </Link>
                      )}
                      <hr className="my-2 dark:border-neutral-700" />
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/connexion" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200">
                  Se connecter
                </Link>
                <Link to="/inscription" className="bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 text-neutral-600 dark:text-neutral-300"
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <svg className="h-6 w-6 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
          <div className="px-4 py-6 space-y-2 bg-neutral-50/90 dark:bg-neutral-900/85 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800">
            <Link to="/" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
            <Link to="/about" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>À propos</Link>
            <Link to="/produits" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Produits</Link>
            <Link to="/contact" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Contact</Link>

            {/* Section Contenu */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <p className="px-4 py-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Contenu</p>
              <Link to="/blog" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/faq" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
              <Link to="/support" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Support</Link>
            </div>

            {/* Section Compte */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <p className="px-4 py-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Connexion</p>
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">
                    {user?.prenom} {user?.nom}
                  </div>
                  <Link to="/profile" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Mon Profil</Link>
                  <Link to="/commandes" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Mes Commandes</Link>
                  <Link to="/favoris" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Mes Favoris</Link>
                  {(user?.role === 'vendeur' || user?.role === 'admin') && (
                    <Link to="/dashboard" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Tableau de bord</Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/connexion" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                  <Link to="/inscription" className="mobile-nav-link dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800" onClick={() => setIsMenuOpen(false)}>Inscription</Link>
                </>
              )}
            </div>

            {/* Panier */}
            <div className="pt-2 border-t border-neutral-200">
              <Link to="/panier" className="mobile-nav-link relative flex items-center" onClick={() => setIsMenuOpen(false)}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Mon Panier
                {itemCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">{itemCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 