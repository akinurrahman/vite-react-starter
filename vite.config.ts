import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@form-input': path.resolve(__dirname, './src/systems/form-input'),
    },
  },
  build: {
    // lucide-react is ~150 kB gzip — raise threshold to avoid false alarm
    chunkSizeWarningLimit: 700,

    rolldownOptions: {
      output: {
        // Split large vendor libraries into separate cacheable chunks
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;
          if (id.includes('recharts') || id.includes('d3-')) return 'charts';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('@tanstack/react-table')) return 'table';
          if (id.includes('@tanstack/react-query')) return 'query';
          if (id.includes('@tanstack/')) return 'tanstack';
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod'))
            return 'forms';
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('lucide-react')) return 'icons';
          return 'vendor';
        },
      },
    },
  },
});
