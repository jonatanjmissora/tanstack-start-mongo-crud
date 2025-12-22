1 - npm create vite@latest .

2 - npm install tailwindcss @tailwindcss/vite

3 - TAILWIND CSS install
 en vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

3.1 - en index.css
@import "tailwindcss";