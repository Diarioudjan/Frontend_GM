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
import AdminDashboard from './admin/AdminDashboard';
import Error404 from './pages/Error404';
// Nouvelles pages
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Support from './pages/Support';
import RegionDetail from './pages/RegionDetail';
import CategoryDetail from './pages/CategoryDetail';
// Import de l'application d'administration
import AdminApp from './admin/AdminApp';

// Layout avec Navbar et Footer
const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen font-poppins">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// Layout sans Navbar ni Footer (pour connexion/inscription)
const AuthLayout = ({ children }) => (
  <div className="min-h-screen font-poppins">
    {children}
  </div>
);

function App() {
  // Diagnostic des erreurs au chargement
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
                <Route path="/panier" element={<MainLayout><Panier /></MainLayout>} />
                <Route path="/paiement" element={<MainLayout><Paiement /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

                {/* Compte utilisateur */}
                <Route path="/dashboard" element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </MainLayout>
                } />
                <Route path="/profile" element={<Navigate to="/dashboard?tab=profile" replace />} />
                <Route path="/commandes" element={<Navigate to="/dashboard?tab=orders" replace />} />
                <Route path="/favoris" element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  </MainLayout>
                } />

                {/* Contenu et support */}
                <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
                <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
                <Route path="/support" element={<MainLayout><Support /></MainLayout>} />

                {/* Pages légales */}
                <Route path="/politique-confidentialite" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
                <Route path="/conditions-utilisation" element={<MainLayout><TermsOfService /></MainLayout>} />

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