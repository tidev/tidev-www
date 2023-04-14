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
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-headings': theme('colors.white'),
                        '--tw-prose-code': '#FF0000',
                        '--tw-prose-bold': theme('colors.white'),
                        '--tw-prose-links': '#198ac2',
                        '--tw-prose-code': '#ff62d0',
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                    }
                }
            })
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
};
