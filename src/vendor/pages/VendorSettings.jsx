import React, { useState } from 'react';

const VendorSettings = () => {
    const [settings, setSettings] = useState({
        notifications: {
            orders: true,
            stock: true,
            reviews: false,
            marketing: true
        },
        language: 'Français',
        currency: 'GNF'
    });

    const toggleNotification = (key) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    return (
        <div className="animate-in fade-in duration-700">
            <div className="mb-4">
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white mb-1.5">Paramètres du compte</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">Configurez vos préférences et notifications</p>
            </div>

            <div className="max-w-4xl space-y-6">
                {/* Notifications Section */}
                <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] shadow-soft overflow-hidden">
                    <div className="p-6 border-b border-neutral-100 dark:border-[#1a1a1a]">
                        <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Notifications par E-mail</h2>
                        <div className="space-y-3">
                            {Object.entries(settings.notifications).map(([key, value]) => (
                                <label key={key} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-[#1a1a1a] rounded-xl border border-neutral-100 dark:border-[#1a1a1a] cursor-pointer group hover:border-[#f27405]/30 transition-all">
                                    <div>
                                        <p className="font-bold text-xs text-neutral-900 dark:text-white capitalize">
                                            {key === 'orders' ? 'Nouvelles commandes' :
                                                key === 'stock' ? 'Alertes de stock' :
                                                    key === 'reviews' ? 'Avis clients' : 'Marketing'}
                                        </p>
                                        <p className="text-[9px] text-neutral-500">Recevoir des alertes par email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={value}
                                            onChange={() => toggleNotification(key)}
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#f27405]"></div>
                                    </label>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Interface Section */}
                <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] shadow-soft overflow-hidden">
                    <div className="p-6 border-b border-neutral-100 dark:border-[#1a1a1a]">
                        <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Préférences Boutique</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Langue de l'interface</label>
                                <select
                                    className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#1a1a1a] rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#f27405] outline-none appearance-none cursor-pointer dark:text-white"
                                    value={settings.language}
                                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                >
                                    <option>Français</option>
                                    <option>English</option>
                                    <option>Pulaar</option>
                                    <option>Malinké</option>
                                    <option>Soussou</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Devise par défaut</label>
                                <select
                                    className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#1a1a1a] rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#f27405] outline-none appearance-none cursor-pointer dark:text-white"
                                    value={settings.currency}
                                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                >
                                    <option>GNF (Franc Guinéen)</option>
                                    <option>EUR (Euro)</option>
                                    <option>USD (Dollar US)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button className="px-6 py-2.5 bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400 rounded-xl text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all">
                        Réinitialiser
                    </button>
                    <button className="px-6 py-2.5 bg-[#f27405] hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-xl shadow-orange-500/20 transition-all transform hover:scale-[1.02]">
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorSettings;
