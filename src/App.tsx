import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { logErrors } from './utils/debug';
import ErrorBoundary from './components/ErrorBoundary';
import GuestRoute from './components/GuestRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ProduitsPublic from './pages/Produits_Professional';
import ProduitsClient from './pages/Produits';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Contact from './pages/Contact';
import FicheProduit from './pages/FicheProduit';
import Error404 from './pages/Error404';
import RegionDetail from './pages/RegionDetail';
import CategoryDetail from './pages/CategoryDetail';
import AdminApp from './admin/AdminApp';
import VendorApp from './vendor/VendorApp';
import ClientLayout from './client/components/ClientLayout';
import ClientProtectedRoute from './client/components/ClientProtectedRoute';
import Dashboard from './client/pages/Dashboard';
import BuyerHome from './client/pages/BuyerHome';
import Panier from './client/pages/Panier';
import Paiement from './client/pages/Paiement';
import OrderDetail from './client/pages/OrderDetail';
import Wishlist from './client/pages/Wishlist';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import Support from './pages/Support';

interface LayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
    </div>
);

const AuthLayout: React.FC<LayoutProps> = ({ children }) => (
    <div className="min-h-screen">
        {children}
    </div>
);

function App() {
    React.useEffect(() => {
        logErrors();
    }, []);

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <AuthProvider>
                    <CartProvider>
                        <Router>
                            <Routes>
                                <Route path="/admin/*" element={<AdminApp />} />
                                <Route path="/vendor/*" element={<VendorApp />} />

                                <Route element={<ClientProtectedRoute><ClientLayout /></ClientProtectedRoute>}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/buyer/home" element={<BuyerHome />} />
                                    <Route path="/catalogue-client" element={<ProduitsClient />} />
                                    <Route path="/catalogue-client/produit/:id" element={<FicheProduit />} />
                                    <Route path="/panier" element={<Panier />} />
                                    <Route path="/paiement" element={<Paiement />} />
                                    <Route path="/commande/:id" element={<OrderDetail />} />
                                    <Route path="/favoris" element={<Wishlist />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/commandes" element={<OrderHistory />} />
                                    <Route path="/support" element={<Support />} />
                                    <Route path="/support-client" element={<Support />} />
                                </Route>

                                <Route path="/connexion" element={<GuestRoute><AuthLayout><Connexion /></AuthLayout></GuestRoute>} />
                                <Route path="/inscription" element={<GuestRoute><AuthLayout><Inscription /></AuthLayout></GuestRoute>} />

                                <Route path="/" element={<GuestRoute><MainLayout><Home /></MainLayout></GuestRoute>} />
                                <Route path="/about" element={<GuestRoute><MainLayout><About /></MainLayout></GuestRoute>} />
                                <Route path="/contact" element={<GuestRoute><MainLayout><Contact /></MainLayout></GuestRoute>} />
                                <Route path="/produits" element={<MainLayout><ProduitsPublic /></MainLayout>} />
                                <Route path="/produit/:id" element={<MainLayout><FicheProduit /></MainLayout>} />
                                <Route path="/region/:id" element={<MainLayout><RegionDetail /></MainLayout>} />
                                <Route path="/categorie/:id" element={<MainLayout><CategoryDetail /></MainLayout>} />

                                <Route path="*" element={<MainLayout><Error404 /></MainLayout>} />
                            </Routes>
                        </Router>
                    </CartProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
