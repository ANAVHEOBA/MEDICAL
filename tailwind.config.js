/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary colors
        "primary-green": "#9333EA",  // Purple instead of green for primary
        "nav-border": "#4C1D95",     // Dark purple for borders
        "muted": "#D8B4FE",          // Light purple for muted text
        "light-gray": "#E9D5FF",     // Very light purple instead of gray
        "primary-blue": "#6366F1",   // Indigo tone for blue elements
        "dark-blue": "#312E81",      // Dark indigo for contrast
        "primary-yellow": "#F472B6",  // Pink accent instead of yellow

        // Dark mode specific colors
        "dark-muted": "#A78BFA",     // Soft purple for dark mode muted elements
        "dark-input-border": "#7C3AED", // Medium purple for input borders
        "dark-blue-input": "#4C1D95",   // Deep purple for input backgrounds
        "dark-placeholder": "#8B5CF6",   // Bright purple for placeholders
        "dark-card": "#0c0114",         // Very dark purple for cards
        "dark-footer": "#0c0114",       // Matching dark purple for footer
        "dark-input-text": "#E9D5FF",   // Light purple for input text
        "modal-heading": "#C084FC",      // Bright purple for modal headings
      },
      boxShadow: {
        "light": "2px 2px 13px rgba(147, 51, 234, 0.1)",  // Purple tinted shadow
        "input-box": "0px 24px 24px rgba(147, 51, 234, 0.3)", // Purple glow effect
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom right, #4C1D95, #1E1B4B)', // Purple to dark gradient
        'gradient-accent': 'linear-gradient(to right, #F472B6, #9333EA)', // Pink to purple gradient
      },
    },
  },
  plugins: [],
}
