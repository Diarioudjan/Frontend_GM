import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Convertir l'URL du fichier en chemin absolu
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  envPrefix: 'REACT_APP_',
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  define: {
    'process.env': {},
  },
});
