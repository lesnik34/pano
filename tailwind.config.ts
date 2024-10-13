/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';
import themeConfig from './theme.config';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [nextui(themeConfig)],
};
