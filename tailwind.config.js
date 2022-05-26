module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    '500': '#53B7E9', // tint
                    '700': '#198AC2'
                },
                neutral: {
                    '900': '#25272A',
                    '800': '#23272B'
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
};
