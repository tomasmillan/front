/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          '100': '#F5F5DC',
          '200': '#FAF3E0',
          '300': '#EDE7D9',
          '400': '#D2B48C',
          '500': '#A67C52',
          '600': '#8B5A2B',
          '700': '#613D1E',
          '800': '#3B2310',
          '900': '#1E1205',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
