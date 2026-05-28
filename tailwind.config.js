/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary": "#9e3d00",
        "surface-variant": "#e3e2e7",
        "on-primary-fixed-variant": "#004493",
        "secondary-container": "#6ffb85",
        "primary-container": "#0070eb",
        "on-primary-fixed": "#001a41",
        "on-secondary-container": "#00732a",
        "on-tertiary-container": "#fffbff",
        "error-container": "#ffdad6",
        "on-primary-container": "#fefcff",
        "on-tertiary-fixed-variant": "#7c2e00",
        "on-tertiary-fixed": "#351000",
        "outline-variant": "#c1c6d7",
        "on-background": "#1a1b1f",
        "surface-container-low": "#f4f3f8",
        "on-error-container": "#93000a",
        "secondary": "#006e28",
        "on-tertiary": "#ffffff",
        "surface-container": "#eeedf3",
        "on-surface-variant": "#414755",
        "surface-container-highest": "#e3e2e7",
        "on-secondary": "#ffffff",
        "surface-dim": "#dad9df",
        "inverse-primary": "#adc6ff",
        "secondary-fixed-dim": "#53e16f",
        "surface": "#faf9fe",
        "on-error": "#ffffff",
        "secondary-fixed": "#72fe88",
        "error": "#ba1a1a",
        "primary-fixed-dim": "#adc6ff",
        "outline": "#717786",
        "surface-container-high": "#e9e7ed",
        "primary-fixed": "#d8e2ff",
        "tertiary-fixed-dim": "#ffb595",
        "tertiary-fixed": "#ffdbcc",
        "inverse-on-surface": "#f1f0f5",
        "inverse-surface": "#2f3034",
        "on-surface": "#1a1b1f",
        "on-secondary-fixed": "#002107",
        "on-primary": "#ffffff",
        "surface-bright": "#faf9fe",
        "tertiary-container": "#c64f00",
        "background": "#faf9fe",
        "primary": "#0058bc",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#005bc1",
        "on-secondary-fixed-variant": "#00531c"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "lg": "40px",
        "xl": "64px",
        "sm": "12px",
        "md": "24px",
        "base": "8px",
        "xs": "4px",
        "container-max": "1200px",
        "gutter": "24px"
      },
      fontFamily: {
        "headline-md": ["Manrope", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Manrope", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "headline-lg": ["Manrope", "sans-serif"],
        "display-lg": ["Manrope", "sans-serif"],
        "label-md": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }]
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
