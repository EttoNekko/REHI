import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import manifest from './public/manifest.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
