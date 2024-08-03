/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {
          colors: {
            background: '#1D1D1E',
          },
        },
      },
    }),
  ],
};
