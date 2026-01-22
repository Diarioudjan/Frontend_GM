# Guide de Test - Frontend GuinéeMakiti (Vite + Backend)

## 🚀 Démarrage

### 1. Démarrer le Backend
```bash
cd guineemakiti-backend
npm run dev
```
(Assurez-vous que MongoDB est lancé)

### 2. Démarrer le Frontend
```bash
cd guineemakiti-frontend
npm start
```
L'application sera accessible sur `http://localhost:3000`.

## 🧪 Scénarios de Test

### ✅ Test 1 : Authentification (Connecté au Backend)
- [ ] **Inscription** : Créer un nouveau compte utilisateur. Vérifier qu'il est créé dans la base de données.
- [ ] **Connexion** : Se connecter avec le compte créé. Vérifier que le token est stocké.
- [ ] **Déconnexion** : Vérifier la redirection vers la page de connexion.

### ✅ Test 2 : Panier (Persistant)
- [ ] **Ajout** : Ajouter des produits au panier depuis la liste ou le détail.
- [ ] **Persistance** : Rafraîchir la page. Le panier doit rester (chargé depuis l'API).
- [ ] **Modification** : Changer les quantités.
- [ ] **Suppression** : Retirer un article.

### ✅ Test 3 : Commande
- [ ] Remplir le panier.
- [ ] Aller sur la page **Paiement**.
- [ ] Remplir le formulaire de livraison.
- [ ] Confirmer la commande.
- [ ] Vérifier que le panier est vidé après la commande.
- [ ] Vérifier la redirection vers l'historique des commandes.

### ✅ Test 4 : Dashboard Protégé
- [ ] Tenter d'accéder à `/dashboard` sans être connecté -> Redirection vers Connexion.
- [ ] Accéder à `/dashboard` connecté -> Affichage des données réelles (Profil, Commandes).

## 📊 Données
Les données affichées (Produits, Commandes, Panier) proviennent maintenant de votre base de données MongoDB via l'API à `http://localhost:5000`.

## 🎯 Critères de succès
- [ ] Build de production réussi (`npm run build`).
- [ ] Pas d'erreurs CORS ou de proxy dans la console.
- [ ] Les données survivent au rechargement de page (gestion d'état + DB). 