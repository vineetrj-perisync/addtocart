module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Automatically centers the container
        // padding: '2rem',  Adds 2rem padding on all sides
        screens: {
          sm: '650px',
          md: '781px',
          lg: '900px',
          xl: '1024px',
          '2xl': '1080px',
        },
      },
    },
  },
  plugins: [],
};
