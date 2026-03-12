import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendorProtectedRoute from './components/VendorProtectedRoute';
import VendorLayout from './components/VendorLayout';
import VendorDashboard from './pages/VendorDashboard';
import VendorProducts from './pages/VendorProducts';
import VendorOrders from './pages/VendorOrders';
import VendorProfile from './pages/VendorProfile';
import VendorStats from './pages/VendorStats';
import VendorSettings from './pages/VendorSettings';

function VendorApp() {
    return (
        <div className="vendor-app">
            <Routes>
                <Route element={
                    <VendorProtectedRoute>
                        <VendorLayout />
                    </VendorProtectedRoute>
                }>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<VendorDashboard />} />
                    <Route path="products" element={<VendorProducts />} />
                    <Route path="orders" element={<VendorOrders />} />
                    <Route path="profile" element={<VendorProfile />} />
                    <Route path="stats" element={<VendorStats />} />
                    <Route path="settings" element={<VendorSettings />} />
                </Route>

                {/* Redirection vers l'accueil si route inconnue dans /vendor */}
                <Route path="*" element={<Navigate to="/vendor/dashboard" replace />} />
            </Routes>
        </div>
    );
}

export default VendorApp;
