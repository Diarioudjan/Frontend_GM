import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Inscription = () => {
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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation prénom
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    } else if (formData.prenom.trim().length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    // Validation email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    // Validation téléphone
    if (!formData.telephone) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    } else if (!/^(\+224|224)?[0-9]{9}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide (format: +224XXXXXXXXX ou 224XXXXXXXXX)';
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation confirmation mot de passe
    if (!formData.confirmerPassword) {
      newErrors.confirmerPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmerPassword) {
      newErrors.confirmerPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Préparer les données pour l'API
      const userData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        password: formData.password,
        role: formData.role
      };

      // Appel à l'API d'inscription
      const response = await authService.register(userData);

      console.log('Inscription réussie:', response);

      // Redirection après inscription réussie
      navigate('/connexion', {
        state: { message: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.' }
      });

    } catch (error) {
      console.error('Erreur d\'inscription:', error);

      // Gérer les erreurs de l'API
      if (error.response?.data?.errors) {
        const apiErrors = {};
        error.response.data.errors.forEach(err => {
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-900 dark:to-neutral-800 flex flex-col">


      {/* Contenu principal */}
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Bouton retour */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>

          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src="/assets/logo.png" alt="GuinéeMakiti" className="h-16 w-auto object-contain" />
            </div>

            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Créer votre compte
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ou{' '}
              <Link to="/connexion" className="font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200">
                connectez-vous à votre compte existant
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="card p-8 shadow-large">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Message d'erreur général */}
              {errors.general && (
                <div className="alert-error">
                  {errors.general}
                </div>
              )}

              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Nom
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className={`input-field ${errors.nom ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Votre nom"
                  />
                  {errors.nom && (
                    <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    className={`input-field ${errors.prenom ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Votre prénom"
                  />
                  {errors.prenom && (
                    <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Numéro de téléphone
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`input-field ${errors.telephone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="+224 XXXXXXXXX"
                />
                {errors.telephone && (
                  <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                )}
              </div>

              {/* Rôle */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Type de compte
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="client">Client - Acheter des produits</option>
                  <option value="vendeur">Vendeur - Vendre mes produits</option>
                </select>
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Votre mot de passe"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-neutral-500">
                  Le mot de passe doit contenir au moins 6 caractères.
                </p>
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <label htmlFor="confirmerPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmerPassword"
                  name="confirmerPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmerPassword}
                  onChange={handleChange}
                  className={`input-field ${errors.confirmerPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Confirmez votre mot de passe"
                />
                {errors.confirmerPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmerPassword}</p>
                )}
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                  J'accepte les{' '}
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    conditions d'utilisation
                  </a>{' '}
                  et la{' '}
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    politique de confidentialité
                  </a>
                </label>
              </div>

              {/* Bouton d'inscription */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="loading-spinner w-5 h-5 mr-3"></div>
                      Création en cours...
                    </div>
                  ) : (
                    'Créer mon compte'
                  )}
                </button>
              </div>
            </form>

            {/* Séparateur */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">Ou s'inscrire avec</span>
                </div>
              </div>

              {/* Boutons sociaux */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="btn-outline border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  Google
                </button>

                <button className="btn-outline border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription; 