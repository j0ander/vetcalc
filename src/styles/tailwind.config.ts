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
        // Surface
        surface: '#f4faff',
        'surface-dim': '#cfdce4',
        'surface-bright': '#f4faff',

        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#e9f6fd',
        'surface-container': '#e3f0f8',
        'surface-container-high': '#ddeaf2',
        'surface-container-highest': '#d7e4ec',

        'surface-variant': '#d7e4ec',

        // Text
        'on-surface': '#111d23',
        'on-surface-variant': '#40493d',

        // Inverse
        'inverse-surface': '#263238',
        'inverse-on-surface': '#e6f3fb',
        'inverse-primary': '#88d982',

        // Outline
        outline: '#707a6c',
        'outline-variant': '#bfcaba',

        // Primary
        primary: '#0d631b',
        'on-primary': '#ffffff',

        'primary-container': '#2e7d32',
        'on-primary-container': '#cbffc2',

        'primary-fixed': '#a3f69c',
        'primary-fixed-dim': '#88d982',

        'on-primary-fixed': '#002204',
        'on-primary-fixed-variant': '#005312',

        // Secondary
        secondary: '#006e1c',
        'on-secondary': '#ffffff',

        'secondary-container': '#91f78e',
        'on-secondary-container': '#00731e',

        'secondary-fixed': '#94f990',
        'secondary-fixed-dim': '#78dc77',

        'on-secondary-fixed': '#002204',
        'on-secondary-fixed-variant': '#005313',

        // Tertiary
        tertiary: '#705d00',
        'on-tertiary': '#ffffff',

        'tertiary-container': '#c9a900',
        'on-tertiary-container': '#4c3e00',

        'tertiary-fixed': '#ffe16d',
        'tertiary-fixed-dim': '#e9c400',

        'on-tertiary-fixed': '#221b00',
        'on-tertiary-fixed-variant': '#544600',

        // Error
        error: '#ba1a1a',
        'on-error': '#ffffff',

        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        // Background
        background: '#f4faff',
        'on-background': '#111d23',

        // Misc
        'surface-tint': '#1b6d24'
      },

      fontFamily: {
        'headline-xl': ['Inter', 'sans-serif'],
        'headline-lg': ['Inter', 'sans-serif'],
        'headline-lg-mobile': ['Inter', 'sans-serif'],
        'headline-md': ['Inter', 'sans-serif'],

        'body-lg': ['Source Sans 3', 'sans-serif'],
        'body-md': ['Source Sans 3', 'sans-serif'],

        'label-md': ['Inter', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif']
      },

      fontSize: {
        'headline-xl': [
          '32px',
          {
            lineHeight: '40px',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }
        ],

        'headline-lg': [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '600',
            letterSpacing: '-0.01em'
          }
        ],

        'headline-lg-mobile': [
          '22px',
          {
            lineHeight: '28px',
            fontWeight: '600'
          }
        ],

        'headline-md': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: '600'
          }
        ],

        'body-lg': [
          '18px',
          {
            lineHeight: '26px',
            fontWeight: '400'
          }
        ],

        'body-md': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '400'
          }
        ],

        'label-md': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '500',
            letterSpacing: '0.01em'
          }
        ],

        'label-sm': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '600'
          }
        ]
      },

      spacing: {
        base: '8px',

        'container-padding': '16px',
        gutter: '12px',

        'touch-target-min': '48px',

        'stack-sm': '4px',
        'stack-md': '16px',
        'stack-lg': '24px'
      },

      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px'
      },

      boxShadow: {
        card: '0px 2px 8px rgba(38, 50, 56, 0.08)',
        elevated: '0px 4px 12px rgba(38, 50, 56, 0.12)',
        navbar: '0px -2px 8px rgba(38, 50, 56, 0.08)'
      },

      animation: {
        'brand-pulse': 'brand-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 1s linear infinite'
      },

      keyframes: {
        'brand-pulse': {
          '0%,100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.02)',
            opacity: '0.95'
          }
        },

        'spin-slow': {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        }
      }
    }
  },

  plugins: []
} satisfies Config