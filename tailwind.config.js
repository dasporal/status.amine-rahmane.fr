/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './@/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'text': {
          50: 'rgb(250, 240, 235)',
          100: 'rgb(245, 224, 214)',
          200: 'rgb(235, 194, 173)',
          300: 'rgb(224, 163, 133)',
          400: 'rgb(214, 133, 92)',
          500: 'rgb(204, 102, 51)',
          600: 'rgb(163, 82, 41)',
          700: 'rgb(122, 61, 31)',
          800: 'rgb(82, 41, 20)',
          900: 'rgb(41, 20, 10)',
          950: 'rgb(20, 10, 5)',
        },
        'background': {
          50: 'rgb(244, 242, 241)',
          100: 'rgb(232, 230, 227)',
          200: 'rgb(210, 204, 198)',
          300: 'rgb(187, 179, 170)',
          400: 'rgb(164, 153, 142)',
          500: 'rgb(142, 128, 113)',
          600: 'rgb(113, 102, 91)',
          700: 'rgb(85, 77, 68)',
          800: 'rgb(57, 51, 45)',
          900: 'rgb(28, 26, 23)',
          950: 'rgb(14, 13, 11)',
        },
        'primary': {
          50: 'rgb(245, 241, 240)',
          100: 'rgb(235, 228, 224)',
          200: 'rgb(214, 201, 194)',
          300: 'rgb(194, 173, 163)',
          400: 'rgb(173, 146, 133)',
          500: 'rgb(153, 119, 102)',
          600: 'rgb(122, 95, 82)',
          700: 'rgb(92, 71, 61)',
          800: 'rgb(61, 48, 41)',
          900: 'rgb(31, 24, 20)',
          950: 'rgb(15, 12, 10)',
        },
        'secondary': {
          50: 'rgb(235, 239, 249)',
          100: 'rgb(215, 224, 244)',
          200: 'rgb(175, 193, 233)',
          300: 'rgb(136, 161, 221)',
          400: 'rgb(96, 130, 210)',
          500: 'rgb(56, 99, 199)',
          600: 'rgb(45, 79, 159)',
          700: 'rgb(34, 59, 119)',
          800: 'rgb(22, 40, 80)',
          900: 'rgb(11, 20, 40)',
          950: 'rgb(6, 10, 20)',
        },
        'accent': {
          50: 'rgb(252, 236, 233)',
          100: 'rgb(248, 218, 211)',
          200: 'rgb(242, 180, 166)',
          300: 'rgb(235, 143, 122)',
          400: 'rgb(228, 105, 78)',
          500: 'rgb(222, 68, 33)',
          600: 'rgb(177, 54, 27)',
          700: 'rgb(133, 41, 20)',
          800: 'rgb(89, 27, 13)',
          900: 'rgb(44, 14, 7)',
          950: 'rgb(22, 7, 3)',
        },
       },       
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}