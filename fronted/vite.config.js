// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: process.env.PORT || 3000,  // Use the Render-assigned port
//     allowedHosts: ['fonevit-website-frontend.onrender.com',],
//   }
// })
import { defineConfig } from 'vite'; // Import defineConfig from vite
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access
    port: process.env.PORT || 3000, // Use Render's dynamically assigned port
    allowedHosts: ['*'], // Allow all hosts
    hmr: {
      host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost', // Support for dynamic host
      protocol: 'wss', // WebSocket Secure for HTTPS
    },
  },
  build: {
    outDir: 'dist', // Output directory for production build
  },
});

