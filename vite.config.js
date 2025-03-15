import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'codemirror': 'codemirror/lib/codemirror.js', // JS alias
      'codemirror/lib/codemirror.css': 'codemirror/lib/codemirror.css', // CSS alias
    },
  },
  plugins: [react()],
})
