import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api';

const VendorProfile = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('store');
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        boutiqueNom: '',
        boutiqueDescription: '',
        adresse: {
            rue: '',
            ville: '',
            codePostal: ''
        }
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userService.getProfile();
                const userData = response.data.user;
                setFormData({
                    prenom: userData.prenom || '',
                    nom: userData.nom || '',
                    email: userData.email || '',
                    telephone: userData.telephone || '',
                    boutiqueNom: userData.boutiqueNom || '',
                    boutiqueDescription: userData.boutiqueDescription || '',
                    adresse: {
                        rue: userData.adresse?.rue || '',
                        ville: userData.adresse?.ville || '',
                        codePostal: userData.adresse?.codePostal || ''
                    }
                });
            } catch (error) {
                console.error('Erreur lors du chargement du profil:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('adresse.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                adresse: { ...prev.adresse, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (activeTab === 'security') {
                if (passwordData.newPassword !== passwordData.confirmPassword) {
                    alert('Les mots de passe ne correspondent pas');
                    return;
                }
                await userService.changePassword({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                });
                alert('Mot de passe mis à jour avec succès !');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                const response = await userService.updateProfile(formData);
                updateUser(response.data.user);
                alert('Profil mis à jour avec succès !');
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            alert(error.response?.data?.message || 'Une erreur est survenue lors de la sauvegarde');
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'store', label: 'Ma Boutique', icon: '🏪' },
        { id: 'personal', label: 'Infos Personnelles', icon: '👤' },
        { id: 'security', label: 'Sécurité', icon: '🔒' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Mon Profil</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">Gérez les informations de votre compte et de votre boutique</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-1.5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all text-xs ${activeTab === tab.id
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                                : 'bg-white dark:bg-[#0a0a0a] text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] border border-neutral-200 dark:border-[#1a1a1a]'
                                }`}
                        >
                            <span className="text-base">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] rounded-2xl p-4 lg:p-6 shadow-soft">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {activeTab === 'store' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative group">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary-500/30 bg-neutral-100 dark:bg-[#1a1a1a]">
                                                <img
                                                    src={user?.avatar || "https://ui-avatars.com/api/?name=Store&background=f27405&color=fff"}
                                                    alt="Store Logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button type="button" className="absolute -bottom-1 -right-1 bg-primary-600 text-white p-1.5 rounded-lg shadow-lg hover:scale-110 transition-transform">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 011.664.89l.812 1.22A2 2 0 0010.07 10H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Logo de la Boutique</h3>
                                            <p className="text-xs text-neutral-500">Format recommandé: PNG ou JPG, min. 500x500px</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Nom de la boutique</label>
                                            <input
                                                type="text"
                                                name="boutiqueNom"
                                                value={formData.boutiqueNom}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-xl py-3 px-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Téléphone professionnel</label>
                                            <input
                                                type="text"
                                                name="telephone"
                                                value={formData.telephone}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-xl py-3 px-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none text-sm"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Description de la boutique</label>
                                            <textarea
                                                rows="4"
                                                name="boutiqueDescription"
                                                value={formData.boutiqueDescription}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-xl py-3 px-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none text-sm"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Rue / Quartier</label>
                                            <input
                                                type="text"
                                                name="adresse.rue"
                                                value={formData.adresse.rue}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Ville</label>
                                            <input
                                                type="text"
                                                name="adresse.ville"
                                                value={formData.adresse.ville}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'personal' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Prénom</label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                value={formData.prenom}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Nom de famille</label>
                                            <input
                                                type="text"
                                                name="nom"
                                                value={formData.nom}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Adresse Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                readOnly
                                                className="w-full bg-neutral-100 dark:bg-[#1a1a1a]/50 border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-500 dark:text-neutral-400 cursor-not-allowed outline-none"
                                            />
                                            <p className="mt-2 text-[10px] text-neutral-500 italic">L'adresse email ne peut pas être modifiée directement.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Mot de passe actuel</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="••••••••"
                                                className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Nouveau mot de passe</label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Min. 8 caractères"
                                                    className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Confirmer le mot de passe</label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Confirmer"
                                                    className="w-full bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-none rounded-2xl py-4 px-6 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-4">
                                        {[
                                            { id: 'notify-orders', label: 'Nouvelles commandes', desc: 'Recevoir un email à chaque nouvelle vente' },
                                            { id: 'notify-reviews', label: 'Avis clients', desc: 'Être informé lorsqu\'un client laisse un commentaire' },
                                            { id: 'notify-stock', label: 'Alertes de stock', desc: 'Alerte automatique quand un produit est presque épuisé' },
                                            { id: 'notify-promo', label: 'Marketing & Conseils', desc: 'Recevoir des astuces pour booster vos ventes' },
                                        ].map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-[#1a1a1a]/50 rounded-2xl border border-neutral-200 dark:border-none">
                                                <div>
                                                    <p className="font-bold text-neutral-900 dark:text-white">{item.label}</p>
                                                    <p className="text-xs text-neutral-500">{item.desc}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 pt-6 mt-8 border-t border-neutral-100 dark:border-[#1a1a1a]">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-xl shadow-primary-600/20 transition-all transform hover:scale-[1.02] flex items-center gap-2 text-sm"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sauvegarde...
                                        </>
                                    ) : (
                                        'Enregistrer les modifications'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-2.5 bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400 rounded-xl font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all text-sm"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
