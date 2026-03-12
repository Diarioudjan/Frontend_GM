import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ClientSidebar: React.FC = () => {
    const { logout } = useAuth();
    // Removed user destructuring if not used, or keep it if needed
    const navigate = useNavigate();

    const menuItems = [
        {
            name: 'Vue d\'ensemble',
            path: '/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            name: 'Boutique',
            path: '/produits',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            name: 'Mon Panier',
            path: '/panier',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            name: 'Mes Achats',
            path: '/dashboard?tab=orders',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            name: 'Favoris',
            path: '/favoris',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            name: 'Support',
            path: '/support',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            name: 'Paramètres',
            path: '/dashboard?tab=profile',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.9240 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/connexion');
    };

    return (
        <div className="w-56 h-screen bg-white dark:bg-[#0a0a0a] flex flex-col fixed left-0 top-0 border-r border-neutral-200 dark:border-[#1a1a1a] transition-colors duration-300">
            <div className="p-4 mb-2 mt-1">
                <div className="flex items-center gap-2">
                    <div className="bg-neutral-100 dark:bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-white/10 p-1.5 shadow-md">
                        <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-neutral-900 dark:text-white font-black text-base leading-none tracking-tight">GuinéeMakiti</h1>
                        <p className="text-primary-500 text-[8px] uppercase tracking-widest font-black mt-0.5">Acheteur</p>
                    </div>
                </div>
            </div>

            <nav className="flex-grow px-2.5 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-neutral-100 dark:bg-[#1a1a1a] text-[#f27405]'
                                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] hover:text-neutral-900 dark:hover:text-white text-xs'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={isActive ? 'text-[#f27405]' : 'text-neutral-400'}>
                                    {React.cloneElement(item.icon, { className: 'w-4 h-4' })}
                                </div>
                                <span className="font-semibold">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-2.5 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-all duration-300 text-xs"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-bold">Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default ClientSidebar;
