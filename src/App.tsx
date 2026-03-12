import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { logErrors } from './utils/debug';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Produits from './pages/Produits';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Contact from './pages/Contact';
import FicheProduit from './pages/FicheProduit';
import Panier from './pages/Panier';
import Paiement from './pages/Paiement';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import Wishlist from './pages/Wishlist';
import BuyerHome from './pages/BuyerHome';
import RegionDetail from './pages/RegionDetail';
import CategoryDetail from './pages/CategoryDetail';
import OrderDetail from './pages/OrderDetail';
import AdminApp from './admin/AdminApp';
import VendorApp from './vendor/VendorApp';

interface LayoutProps {
    children: React.ReactNode;
}

// Layout avec Navbar et Footer
const MainLayout: React.FC<LayoutProps> = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
    </div>
);

// Layout avec Navbar uniquement (pour l'espace client)
const ClientLayout: React.FC<LayoutProps> = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
    </div>
);

// Layout sans Navbar ni Footer (pour connexion/inscription)
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
                                {/* Routes d'administration */}
                                <Route path="/admin/*" element={<AdminApp />} />

                                {/* Routes vendeur */}
                                <Route path="/vendor/*" element={<VendorApp />} />

                                {/* Routes d'authentification (sans navbar/footer) */}
                                <Route path="/connexion" element={<AuthLayout><Connexion /></AuthLayout>} />
                                <Route path="/inscription" element={<AuthLayout><Inscription /></AuthLayout>} />

                                {/* Routes principales du site (avec navbar/footer) */}
                                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                                <Route path="/produits" element={<MainLayout><Produits /></MainLayout>} />
                                <Route path="/produit/:id" element={<MainLayout><FicheProduit /></MainLayout>} />
                                <Route path="/region/:id" element={<MainLayout><RegionDetail /></MainLayout>} />
                                <Route path="/categorie/:id" element={<MainLayout><CategoryDetail /></MainLayout>} />
                                <Route path="/panier" element={<ClientLayout><Panier /></ClientLayout>} />
                                <Route path="/paiement" element={<ClientLayout><Paiement /></ClientLayout>} />
                                <Route path="/commande/:id" element={<ClientLayout><OrderDetail /></ClientLayout>} />
                                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

                                {/* Compte utilisateur */}
                                <Route path="/dashboard" element={
                                    <ClientLayout>
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    </ClientLayout>
                                } />
                                <Route path="/buyer/home" element={
                                    <MainLayout>
                                        <ProtectedRoute>
                                            <BuyerHome />
                                        </ProtectedRoute>
                                    </MainLayout>
                                } />
                                <Route path="/profile" element={<Navigate to="/dashboard?tab=profile" replace />} />
                                <Route path="/commandes" element={<Navigate to="/dashboard?tab=orders" replace />} />
                                <Route path="/favoris" element={
                                    <ClientLayout>
                                        <ProtectedRoute>
                                            <Wishlist />
                                        </ProtectedRoute>
                                    </ClientLayout>
                                } />

                                {/* Page d'erreur */}
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
