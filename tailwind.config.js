export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
    },
  },
  safelist: [
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-pink-500',
    'text-red-500',
    'text-green-500',
    'text-yellow-500',
    'text-pink-500',
  ],
  plugins: [],
};
