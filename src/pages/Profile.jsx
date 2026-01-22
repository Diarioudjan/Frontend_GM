import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: {
      rue: '',
      ville: '',
      pays: '',
      codePostal: ''
    },
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
        adresse: {
          rue: user.adresse?.rue || '',
          ville: user.adresse?.ville || '',
          pays: user.adresse?.pays || 'Guinée',
          codePostal: user.adresse?.codePostal || ''
        },
        preferences: {
          newsletter: user.preferences?.newsletter || false,
          smsNotifications: user.preferences?.smsNotifications || false,
          emailNotifications: user.preferences?.emailNotifications || true,
          language: user.preferences?.language || 'fr'
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
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
      // Appel API pour mettre à jour le profil
      // Note: userService.updateProfile doit être implémenté ou existant
      const response = await userService.updateProfile(user._id, formData);

      // Mettre à jour le contexte d'authentification
      if (updateUser) {
        updateUser(response.data);
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
    // Réinitialiser avec les données actuelles de l'utilisateur
    if (user) {
      setFormData({
        prenom: user.prenom || '',
        nom: user.nom || '',
        email: user.email || '',
        telephone: user.telephone || '',
        adresse: {
          rue: user.adresse?.rue || '',
          ville: user.adresse?.ville || '',
          pays: user.adresse?.pays || 'Guinée',
          codePostal: user.adresse?.codePostal || ''
        },
        preferences: {
          newsletter: user.preferences?.newsletter || false,
          smsNotifications: user.preferences?.smsNotifications || false,
          emailNotifications: user.preferences?.emailNotifications || true,
          language: user.preferences?.language || 'fr'
        }
      });
    }
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const tabs = [
    { id: 'personal', name: 'Informations personnelles', icon: '👤' },
    { id: 'address', name: 'Adresse', icon: '📍' },
    { id: 'preferences', name: 'Préférences', icon: '⚙️' },
    { id: 'security', name: 'Sécurité', icon: '🔒' }
  ];

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.prenom} {user.nom}
              </h1>
              <p className="text-gray-600 dark:text-neutral-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${isEditing
              ? 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
              : 'bg-green-600 text-white hover:bg-green-700'
              }`}
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        {message.text && (
          <div className={`mt-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1 border-r border-gray-200 dark:border-neutral-700 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-l-4 border-green-600'
                  : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-700'
                  }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 p-6">

          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={true} // Email cannot be changed easily
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-gray-100 dark:bg-neutral-700 cursor-not-allowed dark:text-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Adresse</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Rue</label>
                  <input
                    type="text"
                    name="adresse.rue"
                    value={formData.adresse.rue}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Ville</label>
                  <input
                    type="text"
                    name="adresse.ville"
                    value={formData.adresse.ville}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Pays</label>
                  <input
                    type="text"
                    name="adresse.pays"
                    value={formData.adresse.pays}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Code postal</label>
                  <input
                    type="text"
                    name="adresse.codePostal"
                    value={formData.adresse.codePostal}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Préférences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">Newsletter</label>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">Recevoir nos actualités et promotions</p>
                      </div>
                      <input
                        type="checkbox"
                        name="preferences.newsletter"
                        checked={formData.preferences.newsletter}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">Notifications SMS</label>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">Recevoir des SMS pour les commandes</p>
                      </div>
                      <input
                        type="checkbox"
                        name="preferences.smsNotifications"
                        checked={formData.preferences.smsNotifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">Notifications Email</label>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">Recevoir des emails pour les commandes</p>
                      </div>
                      <input
                        type="checkbox"
                        name="preferences.emailNotifications"
                        checked={formData.preferences.emailNotifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Langue</label>
                  <select
                    name="preferences.language"
                    value={formData.preferences.language}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-neutral-700 dark:bg-neutral-800 dark:text-white"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Sécurité</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Mot de passe</h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 mb-4">Pour changer votre mot de passe, veuillez utiliser la fonction de réinitialisation.</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save/Cancel buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-neutral-700">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Sauvegarder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
