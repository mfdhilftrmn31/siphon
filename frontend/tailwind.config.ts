import type { Config } from 'tailwindcss'

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- SHADCN REQUIRED BASE COLORS ---
        background: '#FAFAFA',
        foreground: '#1A1A2E',
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#7C3AED',
        primary: {
          DEFAULT: '#7C3AED',
          foreground: '#FFFFFF',
          hover: '#6D28D9',
        },
        secondary: {
          DEFAULT: '#F3F4F6',
          foreground: '#1F2937',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },
        accent: {
          DEFAULT: '#7C3AED',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A2E',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A2E',
        },
        
        // --- SIPHON CUSTOM COLORS ---
        sidebar: '#3B0764',
        navbar: '#3B0764',
        tab: {
          active: '#7C3AED',
          hover: '#6D28D9',
        },
        text: {
          main: '#1A1A2E',
          muted: '#6B7280',
          sidebar: '#FFFFFF',
        },
        status: {
          high: '#EF4444',
          medium: '#F97316',
          low: '#EAB308',
          safe: '#22C55E',
        },
        mono: {
          bg: '#1E1E2E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
