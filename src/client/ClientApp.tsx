import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ClientLayout from './components/ClientLayout';
import ClientProtectedRoute from './components/ClientProtectedRoute';
import BuyerHome from './pages/BuyerHome';
import Dashboard from './pages/Dashboard';
import OrderDetail from './pages/OrderDetail';
import Paiement from './pages/Paiement';
import Panier from './pages/Panier';
import Wishlist from './pages/Wishlist';
import OrderHistory from '../pages/OrderHistory';
import Profile from '../pages/Profile';
import Support from '../pages/Support';

const ClientApp: React.FC = () => {
    return (
        <Routes>
            <Route
                element={
                    <ClientProtectedRoute>
                        <ClientLayout />
                    </ClientProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/buyer/home" element={<BuyerHome />} />
                <Route path="/panier" element={<Panier />} />
                <Route path="/paiement" element={<Paiement />} />
                <Route path="/commande/:id" element={<OrderDetail />} />
                <Route path="/favoris" element={<Wishlist />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/commandes" element={<OrderHistory />} />
                <Route path="/support" element={<Support />} />
                <Route path="/support-client" element={<Support />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default ClientApp;
