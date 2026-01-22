import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import CategoryManagement from './pages/CategoryManagement';
import RegionManagement from './pages/RegionManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AdminLogin from './pages/AdminLogin';

function AdminApp() {
  return (
    <div className="admin-app">
      <Routes>
        {/* Route de connexion admin */}
        <Route path="login" element={<AdminLogin />} />

        {/* Routes protégées admin */}
        <Route element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="regions" element={<RegionManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </div>
  );
}

export default AdminApp; 