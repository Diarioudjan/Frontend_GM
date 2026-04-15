import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Inscription: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        confirmerPassword: '',
        role: 'client'
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
        else if (formData.nom.trim().length < 2) newErrors.nom = 'Le nom doit contenir au moins 2 caractères';

        if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
        else if (formData.prenom.trim().length < 2) newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';

        if (!formData.email) newErrors.email = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'L\'email n\'est pas valide';

        if (!formData.telephone) newErrors.telephone = 'Le numéro de téléphone est requis';
        // Basic phone validation suitable for international/local formats
        else if (!/^(\+|00)?[0-9]{8,}$/.test(formData.telephone.replace(/\s/g, ''))) newErrors.telephone = 'Numéro de téléphone invalide';

        if (!formData.password) newErrors.password = 'Le mot de passe est requis';
        else if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';

        if (!formData.confirmerPassword) newErrors.confirmerPassword = 'Veuillez confirmer votre mot de passe';
        else if (formData.password !== formData.confirmerPassword) newErrors.confirmerPassword = 'Les mots de passe ne correspondent pas';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await authService.register(formData);
            navigate('/connexion', {
                state: { message: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.' }
            });
        } catch (error: any) {
            console.error('Erreur d\'inscription:', error);
            if (error.response?.data?.errors) {
                const apiErrors: { [key: string]: string } = {};
                error.response.data.errors.forEach((err: any) => {
                    apiErrors[err.path] = err.msg;
                });
                setErrors(apiErrors);
            } else {
                setErrors({
                    general: error.response?.data?.message || 'Erreur d\'inscription. Veuillez réessayer.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex bg-white font-sans overflow-hidden">
            {/* Left Column - Image & Branding - Fixed */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-900 h-full border-r border-white/5">
                <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920"
                    alt="Guinée Terroir"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 blur-[6px] scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between w-full p-8 lg:p-12 h-full">
                    {/* Logo clickable */}
                    <Link to="/" className="mt-4 inline-block hover:scale-105 transition-transform duration-300 self-start">
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
                            <img src="/assets/logo.png" alt="GuinéeMakiti" className="h-14 w-auto object-contain drop-shadow-xl" />
                        </div>
                    </Link>

                    {/* Text */}
                    <div className="space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                            Rejoignez la communauté <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                                GuinéeMakiti
                            </span>
                        </h1>
                        <p className="text-neutral-300 max-w-md text-base leading-relaxed">
                            Créez votre compte pour accéder à des produits authentiques et soutenir l'économie locale.
                        </p>
                        <div className="flex gap-2 pt-2">
                            <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
                            <div className="w-3 h-1 bg-white/30 rounded-full"></div>
                            <div className="w-3 h-1 bg-white/30 rounded-full"></div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-neutral-500 text-[10px] font-medium tracking-wide">
                        © 2024 GuinéeMakiti. Tous droits réservés.
                    </div>
                </div>
            </div>

            {/* Right Column - Form - Scrollable */}
            <div className="w-full lg:w-1/2 flex flex-col items-center p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
                <div className="w-full max-w-md space-y-4 my-auto py-10">
                    {/* Header Mobile Logo */}
                    <div className="lg:hidden mb-4 text-center">
                        <img src="/assets/logo.png" alt="GuinéeMakiti" className="h-16 w-auto mx-auto drop-shadow-lg" />
                    </div>

                    <div className="space-y-2 mb-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">Créer un compte</h2>
                        <p className="text-base text-neutral-500">Remplissez le formulaire ci-dessous pour commencer.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                        {/* Error Messages */}
                        {errors.general && (
                            <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs font-medium border border-red-100 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {errors.general}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nom</label>
                                <input
                                    name="nom"
                                    type="text"
                                    required
                                    value={formData.nom}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm text-neutral-900 placeholder:text-neutral-400 ${errors.nom ? 'border-red-500 ring-4 ring-red-500/10' : 'border-neutral-200 hover:border-neutral-300'}`}
                                    placeholder="Ex: Diallo"
                                />
                                {errors.nom && <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center"><span className="w-1 h-1 bg-red-600 rounded-full mr-1.5"></span>{errors.nom}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Prénom</label>
                                <input
                                    name="prenom"
                                    type="text"
                                    required
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm text-neutral-900 placeholder:text-neutral-400 ${errors.prenom ? 'border-red-500 ring-4 ring-red-500/10' : 'border-neutral-200 hover:border-neutral-300'}`}
                                    placeholder="Ex: Mamadou"
                                />
                                {errors.prenom && <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center"><span className="w-1 h-1 bg-red-600 rounded-full mr-1.5"></span>{errors.prenom}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm text-neutral-900 placeholder:text-neutral-400 ${errors.email ? 'border-red-500 ring-4 ring-red-500/10' : 'border-neutral-200 hover:border-neutral-300'}`}
                                placeholder="exemple@email.com"
                            />
                            {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center"><span className="w-1 h-1 bg-red-600 rounded-full mr-1.5"></span>{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Téléphone</label>
                            <input
                                name="telephone"
                                type="tel"
                                required
                                value={formData.telephone}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm text-neutral-900 placeholder:text-neutral-400 ${errors.telephone ? 'border-red-500 ring-4 ring-red-500/10' : 'border-neutral-200 hover:border-neutral-300'}`}
                                placeholder="+224 6XX XX XX XX"
                            />
                            {errors.telephone && <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center"><span className="w-1 h-1 bg-red-600 rounded-full mr-1.5"></span>{errors.telephone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Type de compte</label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm text-neutral-900 appearance-none cursor-pointer border-neutral-200 hover:border-neutral-300"
                                >
                                    <option value="client">Client (Je veux acheter)</option>
                                    <option value="vendeur">Vendeur (Je veux vendre)</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-neutral-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Mot de passe</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm text-neutral-900 placeholder:text-neutral-400 pr-10 ${errors.password ? 'border-red-500 ring-4 ring-red-500/10' : 'border-neutral-200 hover:border-neutral-300'}`}
                                        placeholder="Min. 6 caractères"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-1"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center"><span className="w-1 h-1 bg-red-600 rounded-full mr-1.5"></span>{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Confirmation</label>
                                <div className="relative">
                                    <input
                                        name="confirmerPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        required
                                        value={formData.confirmerPassword}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm text-neutral-900 placeholder:text-neutral-400 pr-10 ${errors.confirmerPassword ? 'border-red-500 ring-4 ring-red-500/10' : 'border-neutral-200 hover:border-neutral-300'}`}
                                        placeholder="Confirmer"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-1"
                                    >
                                        {showConfirm ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmerPassword && <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center"><span className="w-1 h-1 bg-red-600 rounded-full mr-1.5"></span>{errors.confirmerPassword}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 mt-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Création...</span>
                                </div>
                            ) : (
                                'Créer mon compte'
                            )}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200"></div></div>
                        <div className="relative flex justify-center text-xs font-medium text-neutral-500">
                            <span className="bg-white px-4">Ou continuer avec</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-3" alt="Google" />
                            <span className="font-medium text-neutral-700 text-sm">Google</span>
                        </button>
                        <button type="button" className="flex items-center justify-center p-3 border border-neutral-200 rounded-xl hover:bg-[#1877F2]/5 hover:border-[#1877F2]/20 transition-colors">
                            <svg className="w-5 h-5 mr-3 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            <span className="font-medium text-neutral-700 text-sm">Facebook</span>
                        </button>
                    </div>

                    <p className="text-center text-sm font-medium text-neutral-500 mt-4 pb-4">
                        Déjà un compte ?{' '}
                        <Link to="/connexion" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Inscription;
