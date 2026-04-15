import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';

interface ClientProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string | string[] | null;
}

const ClientProtectedRoute: React.FC<ClientProtectedRouteProps> = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user, loading } = useAuth() as { isAuthenticated: boolean; user: User | null; loading: boolean };
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verification de l authentification...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/connexion" state={{ from: location }} replace />;
    }

    if (requiredRole && user) {
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/" state={{ error: `Vous n avez pas les permissions necessaires pour acceder a cette page. Roles autorises: ${allowedRoles.join(', ')}` }} replace />;
        }
    } else if (requiredRole && !user && isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verification des permissions...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ClientProtectedRoute;
