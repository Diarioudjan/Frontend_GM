import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const currentUser = authService.getCurrentUser();

        // Si on a un token mais pas d'utilisateur, nettoyer
        if (token && !currentUser) {
          console.warn('Token trouvé mais pas d\'utilisateur, nettoyage...');
          authService.logout();
          setLoading(false);
          return;
        }

        // Si on a utilisateur et token, valider
        if (currentUser && authService.isAuthenticated()) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Erreur lors de l\'initialisation de l\'auth:', err);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Connexion
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.login(credentials);

      // Stocker les données utilisateur
      // Stocker les données utilisateur
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setUser(response.data.user);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur de connexion';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.register(userData);

      // Stocker les données utilisateur
      // Stocker les données utilisateur
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setUser(response.data.user);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur d\'inscription';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  // Mettre à jour les informations utilisateur
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Effacer l'erreur
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    isAuthenticated: !!user || !!localStorage.getItem('token'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 