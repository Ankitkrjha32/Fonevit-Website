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
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access
    port: process.env.PORT || 3000, // Use Render's dynamically assigned port
    allowedHosts: [
      'fonevit-website-frontend.onrender.com', // First frontend server
      'fonevit-website-adminpanel-fronted.onrender.com', // Second frontend server
    ],
    hmr: {
      host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost', // Dynamic hostname for HMR
      protocol: 'wss', // Use WebSocket Secure for HTTPS
    },
  },
  build: {
    outDir: 'dist', // Output directory
  },
})
