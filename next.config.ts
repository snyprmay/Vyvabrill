// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vyva: {
          blue: '#0244FC',
          gold: '#F4A950',
          black: '#000000',
          gray: '#E3E3E3',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};
export default config;