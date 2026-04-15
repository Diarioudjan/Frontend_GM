import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

interface GuestRouteProps {
    children: ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
    const { isAuthenticated, loading, user } = useAuth() as { isAuthenticated: boolean; loading: boolean; user: User | null };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                </div>
            </div>
        );
    }

    // Redirect authenticated users to the correct dashboard so they don't see static pages
    if (isAuthenticated) {
        if (user?.role?.toString().trim().toLowerCase() === 'vendeur') {
            return <Navigate to="/vendor/dashboard" replace />;
        } else if (user?.role?.toString().trim().toLowerCase() === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default GuestRoute;
