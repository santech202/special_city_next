/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./modules/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            white: '#ffffff',
            grey: '#f9f8f9',
            black: '#151617',
            blue: '#1282a6',
            green: '#15b012',
            red: '#f00',
            inputBorder: 'hsl(0deg 0% 80%)'
        },
        extend: {},
    },
    plugins: [],
}
