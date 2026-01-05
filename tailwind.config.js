/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'kenya-green': '#22c55e', // Green 500 - brighter for dark mode
                'kenya-gold': '#eab308',
                'kenya-red': '#ef4444',
                'kenya-black': '#000000',
                'dark-bg': '#0f172a',    // Slate 900
                'dark-card': '#1e293b',  // Slate 800
                'dark-hover': '#334155', // Slate 700
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
