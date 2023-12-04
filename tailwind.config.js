/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'roboto': ['var(--font-roboto)', 'sans-serif'],
                'montserrat': ['var(--font-montserrat)', 'sans-serif'],
            },
            colors: {
                'fon': '#FDFDFD',
                'dark': '#292A2D',
                'light': '#F2F2F1',
                'accent': '#A50B34',
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}
