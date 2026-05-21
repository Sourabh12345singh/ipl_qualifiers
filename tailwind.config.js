/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#f6f8fc',
        'bg-secondary': '#eef2f9',
        'bg-card': 'rgba(255, 255, 255, 0.86)',
        'bg-card-hover': 'rgba(255, 255, 255, 0.98)',
        'accent-orange': '#ff5a36',
        'accent-gold': '#f2b705',
        'accent-blue': '#0d8bff',
        'accent-green': '#0da86f',
        'accent-purple': '#5a67d8',
        'text-primary': '#1a2333',
        'text-secondary': '#425066',
        'text-muted': '#6f7b90',
        'border-glass': 'rgba(13, 33, 65, 0.14)',
        'gradient-start': '#f6f8fc',
        'gradient-end': '#edf3ff',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
