import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path'; // Ensure correct import

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(process.cwd(), 'node_modules/react'),
      'react-dom': path.resolve(process.cwd(), 'node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});



// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc'
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // Explicitly resolve the paths to your node_modules versions:
//       react: path.resolve(__dirname, 'node_modules/react'),
//       'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
//     },
//     // Dedupe ensures only one copy is bundled:
//     dedupe: ['react', 'react-dom'],
//   },
//   optimizeDeps: {
//     // Pre-bundle React dependencies so esbuild can resolve them properly:
//     include: ['react', 'react-dom'],
//   },
// });



// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react-swc'

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
