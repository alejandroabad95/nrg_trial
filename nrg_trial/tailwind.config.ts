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
        paleYellow: '#FEFAE0',    // Amarillo pálido
        lightGreen: '#606C38',    // Verde
        darkGreen: '#283618',     // Verde oscuro
        lightOrange: '#DDA15E',   // Naranja claro
        darkOrange: '#BC6C25',    // Naranja oscuro
      },
    },
  },
  plugins: [],
};
export default config;
