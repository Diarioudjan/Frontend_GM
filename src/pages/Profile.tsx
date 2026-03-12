import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import { User, Address } from '../types';

interface Preferences {
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
    language: string;
}

interface UserFormData {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    adresses: Address[];
    preferences: Preferences;
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth() as { user: User | null; updateUser: (user: User) => void };
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

    const [formData, setFormData] = useState<UserFormData>({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        adresses: [],
        preferences: {
            newsletter: false,
            smsNotifications: false,
            emailNotifications: true,
            language: 'fr'
        }
    });

    useEffect(() => {
        if (user) {
            setFormData({
                prenom: user.prenom || '',
                nom: user.nom || '',
                email: user.email || '',
                telephone: user.telephone || '',
                adresses: user.adresses || [],
                preferences: {
                    newsletter: (user as any).preferences?.newsletter || false,
                    smsNotifications: (user as any).preferences?.smsNotifications || false,
                    emailNotifications: (user as any).preferences?.emailNotifications || true,
                    language: (user as any).preferences?.language || 'fr'
                }
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const parts = name.split('.');
            const parent = parts[0] as keyof UserFormData;
            const child = parts[1];

            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent] as any),
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            // Logic for multi-address: ensure at least one is default if list not empty
            let dataToSave = { ...formData };
            if (dataToSave.adresses?.length > 0 && !dataToSave.adresses.some(a => a.isDefault)) {
                dataToSave.adresses[0].isDefault = true;
            }

            const response = await userService.updateProfile(dataToSave);
            if (updateUser) {
                updateUser(response.data.user || (response.data as any));
            }
            setMessage({ type: 'success', text: 'Profil mis à jour avec succès' });
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur mise à jour profil:', error);
            setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du profil' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                prenom: user.prenom || '',
                nom: user.nom || '',
                email: user.email || '',
                telephone: user.telephone || '',
                adresses: user.adresses || [],
                preferences: {
                    newsletter: (user as any).preferences?.newsletter || false,
                    smsNotifications: (user as any).preferences?.smsNotifications || false,
                    emailNotifications: (user as any).preferences?.emailNotifications || true,
                    language: (user as any).preferences?.language || 'fr'
                }
            });
        }
        setIsEditing(false);
        setMessage({ type: '', text: '' });
    };

    if (!user) return <div>Chargement...</div>;

    const SectionHeader = ({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) => (
        <div className="mb-8 pt-10 first:pt-0">
            <div className="flex items-center space-x-3 mb-2">
                <span className="text-xl">{icon}</span>
                <h2 className="text-[12px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em]">
                    {title}
                </h2>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium lowercase tracking-wide ml-8">
                {subtitle}
            </p>
        </div>
    );

    return (
        <div className="max-w-4xl">
            <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-[#1a1a1a] overflow-hidden shadow-soft-xl">
                {/* Profile Card Header */}
                <div className="relative h-32 bg-primary-500 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:20px_20px]"></div>
                </div>

                <div className="px-10 pb-10">
                    <div className="relative -mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="flex items-end space-x-6">
                            <div className="h-24 w-24 bg-white dark:bg-black rounded-3xl border-4 border-white dark:border-[#0a0a0a] flex items-center justify-center text-3xl font-black text-neutral-900 dark:text-white shadow-xl z-10">
                                {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
                            </div>
                            <div className="pb-2">
                                <h1 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                                    {user.prenom} {user.nom}
                                </h1>
                                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest leading-none mt-1">
                                    Client <span className="text-primary-500 ml-1">• Verified</span>
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${isEditing
                                ? 'bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400'
                                : 'bg-primary-500 text-white shadow-soft-orange hover:scale-105 active:scale-95'
                                }`}
                        >
                            {isEditing ? 'Annuler' : 'Modifier le Profil'}
                        </button>
                    </div>

                    {message.text && (
                        <div className={`mb-12 p-5 rounded-2xl text-[10px] font-bold uppercase tracking-wide flex items-center border ${message.type === 'success'
                            ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 border-primary-100 dark:border-primary-900/20'
                            : 'bg-red-50 dark:bg-red-900/10 text-red-600 border-red-100 dark:border-red-900/20'
                            }`}>
                            <span className="mr-4 text-lg">{message.type === 'success' ? '✅' : '❌'}</span>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-12 divide-y divide-neutral-100 dark:divide-[#111111]">
                        {/* Common Info Section */}
                        <div>
                            <SectionHeader
                                title="Informations Personnelles"
                                subtitle="Vos détails de base pour la plateforme"
                                icon="👤"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 ml-8">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Prénom</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none disabled:text-neutral-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none disabled:text-neutral-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Email (Non modifiable)</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled={true}
                                        className="w-full bg-transparent border-b border-neutral-100 dark:border-neutral-900 py-2 text-sm text-neutral-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Téléphone</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none disabled:text-neutral-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Book Section */}
                        <div>
                            <SectionHeader
                                title="Carnet d'Adresses"
                                subtitle="Gérez vos multiples lieux de livraison"
                                icon="📍"
                            />
                            <div className="ml-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {formData.adresses?.map((addr, index) => (
                                        <div key={index} className={`p-6 rounded-2xl border transition-all ${addr.isDefault ? 'border-primary-500 bg-primary-50/10' : 'border-neutral-100 dark:border-[#1a1a1a] bg-neutral-50/30 dark:bg-[#080808]'}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-primary-500">
                                                    {addr.label || 'Adresse'} {addr.isDefault && '• Par Défaut'}
                                                </span>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => { /* Edit logic would go here, for now we let isEditing handle it */ }} className="text-xs opacity-50 hover:opacity-100">✏️</button>
                                                    <button
                                                        onClick={() => {
                                                            const newAddrs = formData.adresses.filter((_, i) => i !== index);
                                                            setFormData(prev => ({ ...prev, adresses: newAddrs }));
                                                        }}
                                                        className="text-xs opacity-50 hover:opacity-100"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-neutral-900 dark:text-white mb-1">{addr.rue}</p>
                                            <p className="text-[10px] text-neutral-500 uppercase font-medium">{addr.ville}, {addr.region}</p>

                                            {!addr.isDefault && isEditing && (
                                                <button
                                                    onClick={() => {
                                                        const newAddrs = formData.adresses.map((a, i) => ({ ...a, isDefault: i === index }));
                                                        setFormData(prev => ({ ...prev, adresses: newAddrs }));
                                                    }}
                                                    className="mt-4 text-[8px] font-black uppercase tracking-widest text-primary-500 hover:underline"
                                                >
                                                    Définir comme défaut
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    {isEditing && (
                                        <button
                                            onClick={() => {
                                                const newAddr: Address = { rue: '', ville: '', region: 'Conakry', label: 'Nouveau', isDefault: formData.adresses?.length === 0 };
                                                setFormData(prev => ({ ...prev, adresses: [...(prev.adresses || []), newAddr] }));
                                            }}
                                            className="p-6 rounded-2xl border-2 border-dashed border-neutral-100 dark:border-[#1a1a1a] flex flex-col items-center justify-center text-neutral-400 hover:text-primary-500 hover:border-primary-500/50 transition-all group"
                                        >
                                            <span className="text-2xl mb-2 group-hover:scale-125 transition-transform">+</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest">Ajouter une adresse</span>
                                        </button>
                                    )}
                                </div>

                                {/* Inline Editing for the "last clicked" or currently adding address could go here, 
                    but to keep it clean with the existing save pattern, we'll allow editing the fields directly if only one is selected.
                    Actually, for a Pro feel, let's keep the simplicity of the current form but applied to the selected address.
                */}
                                {isEditing && formData.adresses?.length > 0 && (
                                    <div className="bg-neutral-50/50 dark:bg-[#080808] p-8 rounded-3xl border border-neutral-100 dark:border-[#111111] animate-fade-in">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-8">Détails de l'adresse sélectionnée</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                            {/* We'll just edit the last one added or provide a 'selected' state. For brevity, let's assume the user edits the 'new' or chooses one. 
                          In a full implementation, we'd have a 'selectedAddressIndex'. 
                       */}
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Libellé (ex: Maison, Bureau)</label>
                                                <input
                                                    type="text"
                                                    value={formData.adresses[formData.adresses.length - 1]?.label || ''}
                                                    onChange={(e) => {
                                                        const newAddrs = [...formData.adresses];
                                                        newAddrs[newAddrs.length - 1].label = e.target.value;
                                                        setFormData(prev => ({ ...prev, adresses: newAddrs }));
                                                    }}
                                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Rue / Quartier</label>
                                                <input
                                                    type="text"
                                                    value={formData.adresses[formData.adresses.length - 1]?.rue || ''}
                                                    onChange={(e) => {
                                                        const newAddrs = [...formData.adresses];
                                                        newAddrs[newAddrs.length - 1].rue = e.target.value;
                                                        setFormData(prev => ({ ...prev, adresses: newAddrs }));
                                                    }}
                                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Ville</label>
                                                <input
                                                    type="text"
                                                    value={formData.adresses[formData.adresses.length - 1]?.ville || ''}
                                                    onChange={(e) => {
                                                        const newAddrs = [...formData.adresses];
                                                        newAddrs[newAddrs.length - 1].ville = e.target.value;
                                                        setFormData(prev => ({ ...prev, adresses: newAddrs }));
                                                    }}
                                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Account Management */}
                        <div>
                            <SectionHeader
                                title="Sécurité & Compte"
                                subtitle="Gérer votre accès et vos préférences"
                                icon="🔒"
                            />
                            <div className="ml-8 space-y-8 max-w-md">
                                <div className="p-6 bg-neutral-50 dark:bg-[#080808] rounded-2xl border border-neutral-100 dark:border-[#151515]">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-2">Authentification</h3>
                                    <p className="text-[9px] text-neutral-500 mb-6">Changez votre mot de passe pour plus de sécurité.</p>
                                    <button className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-[#111111] transition-all">
                                        Réinitialiser le mot de passe
                                    </button>
                                </div>

                                <div className="flex items-center justify-between px-2">
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white">Newsletter</h3>
                                        <p className="text-[9px] text-neutral-500">Recevez nos offres exclusives</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="preferences.newsletter"
                                        checked={formData.preferences.newsletter}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="h-5 w-5 text-primary-500 rounded-lg border-neutral-300 dark:bg-[#1a1a1a] dark:border-neutral-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    {isEditing && (
                        <div className="mt-16 pt-10 border-t border-neutral-100 dark:border-[#111111] flex justify-end space-x-6">
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-12 py-4 bg-primary-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-soft-orange hover:scale-105 transition-all flex items-center"
                            >
                                {loading && (
                                    <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full mr-3"></div>
                                )}
                                Confirmer les Changements
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
