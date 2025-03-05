import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser", // Utilisation de Terser pour minifier le JS
    terserOptions: {
      compress: {
        drop_console: true, // Supprime les console.log() pour un build plus léger
        drop_debugger: true, // Supprime les debuggers
      },
      output: {
        comments: false, // Supprime les commentaires inutiles
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor"; // Sépare les dépendances dans un fichier vendor.js
          }
        },
      },
    },
  },
});

