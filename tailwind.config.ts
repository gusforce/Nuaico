import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1B3B5D",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#4DD6F0",
          foreground: "#1B3B5D",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#E5E7EB",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#4DD6F0",
          foreground: "#1B3B5D",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1B3B5D",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1B3B5D",
        },
        cyan: {
          DEFAULT: "#4DD6F0",
        },
        navy: {
          DEFAULT: "#1B3B5D",
        },
        brand: {
          DEFAULT: "hsl(var(--brand-primary))",
          foreground: "hsl(var(--brand-primary-foreground))",
          accent: "hsl(var(--brand-accent))",
          "accent-foreground": "hsl(var(--brand-accent-foreground))",
          dark: "hsl(var(--brand-dark))",
          "dark-foreground": "hsl(var(--brand-dark-foreground))",
          muted: "hsl(var(--brand-muted))",
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(to right, #1B3B5D, #4DD6F0)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
} satisfies Config

export default config
