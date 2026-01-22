// Fichier de diagnostic pour identifier les erreurs courantes

export const checkEnvironment = () => {
  const issues = [];

  // Vérifier les variables d'environnement
  if (!import.meta.env.REACT_APP_API_URL) {
    issues.push('REACT_APP_API_URL non définie - utilisation de la valeur par défaut');
  }

  // Vérifier les dépendances - Ignoré pour Vite
  /*
  try {
    import('react-router-dom');
  } catch (e) {
    issues.push('react-router-dom non installé');
  }
  
  try {
    import('axios');
  } catch (e) {
    issues.push('axios non installé');
  }
  */

  return issues;
};

export const checkLocalStorage = () => {
  const issues = [];

  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
  } catch (e) {
    issues.push('localStorage non disponible');
  }

  return issues;
};

export const checkAuthContext = () => {
  const issues = [];

  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user) {
      try {
        JSON.parse(user);
      } catch (e) {
        issues.push('Données utilisateur corrompues dans localStorage');
      }
    }
  } catch (e) {
    issues.push('Erreur lors de la vérification du contexte d\'authentification');
  }

  return issues;
};

export const logErrors = () => {
  console.log('=== DIAGNOSTIC GUINÉEMAKITI ===');

  const envIssues = checkEnvironment();
  const storageIssues = checkLocalStorage();
  const authIssues = checkAuthContext();

  if (envIssues.length > 0) {
    console.warn('Problèmes d\'environnement:', envIssues);
  }

  if (storageIssues.length > 0) {
    console.error('Problèmes de localStorage:', storageIssues);
  }

  if (authIssues.length > 0) {
    console.warn('Problèmes d\'authentification:', authIssues);
  }

  if (envIssues.length === 0 && storageIssues.length === 0 && authIssues.length === 0) {
    console.log('✅ Aucun problème détecté');
  }

  console.log('=== FIN DIAGNOSTIC ===');
}; 