# Guide de dépannage - GuinéeMakiti

## Erreurs courantes et solutions

### 1. Erreurs d'importation

**Problème :** `Module not found` ou `Cannot resolve module`

**Solutions :**
- Vérifiez que tous les fichiers existent
- Vérifiez les chemins d'importation
- Redémarrez le serveur de développement : `npm start`

### 2. Erreurs de formatCurrency

**Problème :** `formatCurrency is not a function`

**Solution :** La fonction est maintenant exportée depuis `services/api.js`

### 3. Erreurs d'authentification

**Problème :** Impossible de se connecter à l'administration

**Solution :** 
- Utilisez les identifiants de test : `admin@guineemakiti.com` / `admin123`
- Vérifiez que le localStorage fonctionne
- Videz le cache du navigateur

### 4. Erreurs de routage

**Problème :** Pages non trouvées ou erreurs 404

**Solutions :**
- Vérifiez que toutes les routes sont définies dans `App.jsx`
- Vérifiez que les composants sont correctement importés
- Redémarrez le serveur

### 5. Erreurs de contexte React

**Problème :** `useAuth must be used within an AuthProvider`

**Solution :** Vérifiez que `AuthProvider` entoure bien l'application

### 6. Erreurs de localStorage

**Problème :** `localStorage is not defined`

**Solution :** Vérifiez que vous êtes dans un environnement navigateur

## Commandes de diagnostic

### Vérifier les dépendances
```bash
npm install
```

### Vérifier les erreurs de compilation
```bash
npm run build
```

### Redémarrer le serveur
```bash
npm start
```

### Vider le cache
```bash
npm run build -- --reset-cache
```

## Structure des fichiers

```
src/
├── admin/                 # Administration
│   ├── AdminApp.jsx      # App principale admin
│   ├── management.js     # Configuration
│   ├── components/       # Composants admin
│   └── pages/           # Pages admin
├── components/           # Composants principaux
├── context/             # Contextes React
├── pages/               # Pages principales
├── services/            # Services API
└── utils/               # Utilitaires
```

## Variables d'environnement

Créez un fichier `.env` à la racine :

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Support

Si vous rencontrez des erreurs :

1. Ouvrez la console du navigateur (F12)
2. Vérifiez les messages d'erreur
3. Utilisez le diagnostic intégré (voir console)
4. Consultez ce guide

## Erreurs connues

- **Erreur de navigation admin** : Utilisez `window.location.href` au lieu de `navigate()` pour la connexion admin
- **Erreur de formatCurrency** : Importez depuis `services/api.js`
- **Erreur de contexte** : Vérifiez que les providers entourent l'application 