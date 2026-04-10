/** @type {import("prettier").Config} */
export default {
    semi: true,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    singleQuote: true,
    useTabs: false,
    tabWidth: 4,
    experimentalTernaries: true,

    plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.svelte',
            options: {
                parser: 'svelte',
            },
        },
    ],
    tailwindStylesheet: './src/routes/layout.css',
};
