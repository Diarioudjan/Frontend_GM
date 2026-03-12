import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/api';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: any) => Promise<any>;
    register: (userData: any) => Promise<any>;
    logout: () => void;
    updateUser: (userData: User) => void;
    clearError: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initAuth = () => {
            try {
                const token = localStorage.getItem('token');
                const currentUser = authService.getCurrentUser();

                if (token && !currentUser) {
                    authService.logout();
                    setLoading(false);
                    return;
                }

                if (currentUser && authService.isAuthenticated()) {
                    setUser(currentUser);
                }
            } catch (err) {
                console.error('Erreur initialization auth:', err);
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: any) => {
        try {
            setError(null);
            setLoading(true);
            const response = await authService.login(credentials);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setUser(response.data.user);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Erreur de connexion';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData: any) => {
        try {
            setError(null);
            setLoading(true);
            const response = await authService.register(userData);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setUser(response.data.user);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Erreur inscription';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setError(null);
    };

    const updateUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

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
