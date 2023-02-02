import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
    plugins: [
        react(),
        monkey({
            entry: 'src/main.ts',
            userscript: {
                icon: 'https://vitejs.dev/logo.svg',
                namespace: 'ocean-flow',
                match: ['https://listen.tidal.com/'],
                description: "Ocean Flow",
                "run-at": "document-start",
                grant: [
                    "unsafeWindow"
                ]
            },
            build: {
                externalGlobals: {
                    react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
                    'react-dom': cdn.jsdelivr(
                        'ReactDOM',
                        'umd/react-dom.production.min.js',
                    ),
                },
            },
        }),
    ],
});
