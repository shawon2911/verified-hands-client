import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // এই লাইনটি ঠিকমতো আছে কিনা চেক করুন

// https://vite.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // এখানে প্লাগইনটি কল করা হয়েছে
  ],
})
