import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import { spawn } from 'child_process';

export default {
    input: 'src/svelte/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js',
    },
    plugins: [
        svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !process.env.NODE_ENV === 'production',
            },
        }),
        css({ output: 'bundle.css' }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        terser(), !process.env.NODE_ENV === 'production' && serve(), !process.env.NODE_ENV === 'production' && livereload('public')
    ],
    watch: {
        clearScreen: false,
    },
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                const proc = spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true,
                });

                proc.on('close', code => {
                    if (code !== 0) {
                        console.error(`npm start exited with code ${code}`);
                    }
                });
            }
        },
    };
}