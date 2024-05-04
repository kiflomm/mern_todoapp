import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,   // replaces the script "vite --port 3000"
    /* proxy:{
        "/api": "http://localhost:500"
    } */
  },
  plugins: [react()],
  base : "/mern_todoapp/"
}) 
