// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx,html}'
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // 🎨 NUEVA PALETA
        primary: {
          DEFAULT: '#F9A825',
          light: '#FBC94D',
          dark: '#C47D0A',
        },
        secondary: {
          DEFAULT: '#00ACC1',
          light: '#4DD0E1',
          dark: '#00838F',
        },
        tertiary: {
          DEFAULT: '#FF7043',
          light: '#FF8A65',
          dark: '#D84315',
        },
        neutral: {
          DEFAULT: '#FDFBF7',
          dark: '#E8E3D5',
          darker: '#D4CDB8',
        },
        // Colores de sistema (opcional, para mantener compatibilidad)
        surface: '#FDFBF7',
        'on-surface': '#1F2A3A',
        error: '#ba1a1a',
        'on-error': '#ffffff',
      },

      fontFamily: {
        'headline-xl': ['Inter', 'sans-serif'],
        'headline-lg': ['Inter', 'sans-serif'],
        'headline-lg-mobile': ['Inter', 'sans-serif'],
        'headline-md': ['Inter', 'sans-serif'],
        'body-lg': ['Source Sans 3', 'sans-serif'],
        'body-md': ['Source Sans 3', 'sans-serif'],
        'label-md': ['Inter', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif'],
      },

      fontSize: {
        'headline-xl': ['32px', { lineHeight: '40px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-lg': ['24px', { lineHeight: '32px', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-lg-mobile': ['22px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '26px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '20px', fontWeight: '500', letterSpacing: '0.01em' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '600' }],
      },

      spacing: {
        base: '8px',
        'container-padding': '16px',
        gutter: '12px',
        'touch-target-min': '48px',
        'stack-sm': '4px',
        'stack-md': '16px',
        'stack-lg': '24px',
      },

      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },

      boxShadow: {
        card: '0px 2px 8px rgba(38, 50, 56, 0.08)',
        elevated: '0px 4px 12px rgba(38, 50, 56, 0.12)',
        navbar: '0px -2px 8px rgba(38, 50, 56, 0.08)',
      },

      // 🎬 NUEVAS ANIMACIONES
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'spin-slow': 'spin 1.2s linear infinite',
        'brand-pulse': 'brand-pulse 3s ease-in-out infinite', // mantenemos la existente
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
        'brand-pulse': {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.95' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },

  plugins: [],
} satisfies Config