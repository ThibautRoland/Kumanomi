import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'kum-cream': '#FFF5EA',
        'kum-yellow': '#FDFD96',
        'kum-light-grey': '#737373',
      },
      boxShadow: {
        'kum-black': '8px 8px 0px black',
      }
    },
  },
  plugins: [],
};
export default config;
