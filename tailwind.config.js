/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'nerko-one': ['"Nerko One"', 'cursive'],
      'suse':["SUSE", 'serif'],
    },
    // colors: {
    //   hoverColor: "#01594D",
    //   brightColor: "#183187",
    //   backgroundColor: "#1D8E63",
    // }

  },
  plugins: [],
}