import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const VendorHeader = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef(null);

    // Dummy notifications
    const notifications = [
        { id: 1, title: 'Nouvelle commande', desc: 'Commande #GM-9823 reçue', time: 'Il y a 2 min', type: 'order', isRead: false },
        { id: 2, title: 'Stock faible', desc: 'Miel de Labé est presque épuisé', time: 'Il y a 1h', type: 'stock', isRead: false },
        { id: 3, title: 'Nouvel avis', desc: 'Un client a noté votre Savon Noir', time: 'Hier', type: 'review', isRead: true },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-14 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-[#1a1a1a] sticky top-0 z-30 px-4 flex items-center justify-between transition-colors duration-300">
            <div className="relative w-72">
                <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full bg-neutral-100 dark:bg-[#1a1a1a] border-none rounded-lg py-1.5 pl-9 pr-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#f27405] transition-all outline-none"
                />
            </div>

            <div className="flex items-center gap-3">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-1.5 bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-500 dark:text-neutral-400 rounded-lg hover:text-[#f27405] dark:hover:text-white transition-colors"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === 'light' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-1.5 rounded-lg transition-colors ${showNotifications ? 'bg-primary-50 text-primary-600 dark:bg-[#1a1a1a] dark:text-white' : 'bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-500 dark:text-neutral-400 hover:text-[#f27405] dark:hover:text-white'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-black"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] rounded-2xl shadow-large overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-4 border-b border-neutral-100 dark:border-[#1a1a1a] flex justify-between items-center bg-neutral-50/50 dark:bg-[#1a1a1a]/40">
                                <h3 className="text-sm font-black text-neutral-900 dark:text-white">Notifications</h3>
                                <button className="text-[10px] font-bold text-primary-600 hover:text-primary-700">Tout marquer comme lu</button>
                            </div>
                            <div className="max-h-[350px] overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`p-4 border-b border-neutral-50 dark:border-[#1a1a1a] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a]/60 transition-colors cursor-pointer group ${!notif.isRead ? 'bg-primary-50/20 dark:bg-primary-500/5' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${notif.type === 'order' ? 'bg-orange-100 text-orange-600' : notif.type === 'stock' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {notif.type === 'order' ? '🛒' : notif.type === 'stock' ? '⚠️' : '⭐'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">{notif.title}</p>
                                                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">{notif.desc}</p>
                                                <p className="text-[9px] text-neutral-400 mt-1">{notif.time}</p>
                                            </div>
                                            {!notif.isRead && (
                                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/vendor/settings"
                                className="block p-3 text-center text-[10px] font-black text-neutral-500 hover:text-primary-600 bg-neutral-50 dark:bg-[#1a1a1a]/40 dark:text-neutral-400 hover:dark:text-white transition-all uppercase tracking-widest border-t border-neutral-100 dark:border-[#1a1a1a]"
                            >
                                Voir tous les paramètres
                            </Link>
                        </div>
                    )}
                </div>

                <div className="h-6 w-px bg-neutral-200 dark:bg-[#1a1a1a]"></div>

                <div className="flex items-center gap-2">
                    <div className="text-right">
                        <p className="text-neutral-900 dark:text-white font-bold text-[10px] leading-none mb-0.5">{user?.prenom} {user?.nom}</p>
                        <p className="text-primary-500 text-[8px] font-black uppercase tracking-tight">Vendeur</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#f27405]/30">
                        <img
                            src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.prenom || 'V') + "+" + (user?.nom || 'V') + "&background=f27405&color=fff"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default VendorHeader;
