/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-card': 'rgba(255, 255, 255, 0.03)',
        'bg-card-hover': 'rgba(255, 255, 255, 0.08)',
        'accent-orange': '#ff4d4d',
        'accent-gold': '#ffc107',
        'accent-blue': '#00d4ff',
        'accent-green': '#00ff88',
        'accent-purple': '#8b5cf6',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0b0',
        'text-muted': '#6b6b80',
        'border-glass': 'rgba(255, 255, 255, 0.1)',
        'gradient-start': '#1a1a2e',
        'gradient-end': '#0a0a0f',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
