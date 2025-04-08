import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path module

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Add this line for the alias
      'codemirror': 'codemirror/lib/codemirror.js', // JS alias
      'codemirror/lib/codemirror.css': 'codemirror/lib/codemirror.css', // CSS alias
    },
  },
  plugins: [react()],
});
