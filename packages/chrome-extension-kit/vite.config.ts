import { defineConfig, LibraryFormats } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
    const commonConfig = {
        plugins: [
            dts({
                insertTypesEntry: true,
            }),
        ],
        build: {
            lib: {
                entry: 'src/index.ts',
                formats: ['es'] as LibraryFormats[],
                fileName: () => 'index.js',
            },
            rollupOptions: {
                external: [],
            },
        },
    };

    if (command === 'serve') {
        return {
            ...commonConfig,
            build: {
                ...commonConfig.build,
                watch: {},
                outDir: 'dist',
            },
        };
    }

    return commonConfig;
});
