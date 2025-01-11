import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import type { UserConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@features', replacement: path.resolve(__dirname, './src/features') },
      { find: '@services', replacement: path.resolve(__dirname, './src/services') },
      { find: '@shared', replacement: path.resolve(__dirname, './src/shared') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@config', replacement: path.resolve(__dirname, './src/config') },
      { find: '@types', replacement: path.resolve(__dirname, './src/types') }
    ]
  },
  build: {
    sourcemap: true,
    outDir: 'dist'
  }
} as UserConfig)