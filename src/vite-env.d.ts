/// <reference types="vite/client" />

// Déclaration des types pour les fichiers de module
// Permet d'importer des fichiers avec des extensions spécifiques
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// Déclaration pour les variables d'environnement
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  // Ajoutez d'autres variables d'environnement ici
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
