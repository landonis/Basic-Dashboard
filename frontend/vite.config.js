import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
};
