import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            return 'vendor';
          }
          if (id.includes('/components/')) {
            const componentName = id.split('/components/')[1].split('.')[0];
            if (['Header', 'Hero', 'BackToTop', 'LoadingSpinner', 'AnimatedBackground'].includes(componentName)) {
              return 'core';
            }
            return 'components';
          }
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    target: 'esnext',
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
    modulePreload: {
      polyfill: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    exclude: [],
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
})
