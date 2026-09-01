import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    server: {
        allowedHosts: ["renter-engulf-spout.ngrok-free.dev"],
        watch: {
            ignored: [
                "**/node_modules/**",
                /vite\.config\.ts\.timestamp-.+\.mjs$/,
                /(^|[\/\\])\../,
            ]
        }
    }
});

