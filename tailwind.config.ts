import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
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
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-links': '#198ac2',
            '--tw-prose-code': '#ff62d0',
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
export default config;
