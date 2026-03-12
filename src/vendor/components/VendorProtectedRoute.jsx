import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VendorProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1512]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f27405] mx-auto"></div>
                    <p className="mt-3 text-neutral-500 text-[10px]">Chargement de l'espace vendeur...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/connexion" replace />;
    }

    // Vérifier si l'utilisateur est un vendeur ou un admin (les admins peuvent tout voir)
    if (user.role !== 'vendeur' && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default VendorProtectedRoute;
