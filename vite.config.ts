import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['photos/*.jpg', 'logo/*', 'icons/*'],
      manifest: {
        name: 'ForestMarkt Adventi Kalendárium',
        short_name: 'Advent 2025',
        description: 'Adventi naptár a ForestMarkt csapatától',
        lang: 'hu',
        start_url: '/',
        display: 'standalone',
        background_color: '#FAF3E0',
        theme_color: '#8B4545',
        icons: [
          {
            src: '/icons/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}'],
        // Képeket nem cache-eljük előre, mert túl nagyok
        // Runtime cache-elés helyett
        runtimeCaching: [
          {
            urlPattern: /\/photos\/.*\.jpg$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'photos-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 nap
              }
            }
          },
          {
            urlPattern: /\/logo\/.*\.(png|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'logo-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ]
})
