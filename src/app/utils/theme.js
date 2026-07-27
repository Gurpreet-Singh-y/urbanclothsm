// styles.js

export const theme = {
  light: {
    mode: "light",

    colors: {
      primary: "#E71D2B", // Urban red
      secondary: "#111111",
      background: "#FFFFFF",
      surface: "#F5F5F5",
      text: "#111111",
      textSecondary: "#666666",
      border: "#E5E5E5",
      accent: "#FF4D5A",
    },

    typography: {
      fontFamily: "'Poppins', sans-serif",
      headingWeight: 700,
      bodyWeight: 400,
    },

    shadows: {
      card: "0 4px 12px rgba(0,0,0,0.08)",
      button: "0 2px 8px rgba(231, 29, 43, 0.2)",
    },

    borderRadius: {
      sm: "8px",
      md: "12px",
      lg: "20px",
    },
  },

  dark: {
    mode: "dark",

    colors: {
      primary: "#E71D2B",
      secondary: "#FFFFFF",
      background: "#0A0A0A",
      surface: "#151515",
      text: "#FFFFFF",
      textSecondary: "#B0B0B0",
      border: "#2A2A2A",
      accent: "#FF4D5A",
    },

    typography: {
      fontFamily: "'Poppins', sans-serif",
      headingWeight: 700,
      bodyWeight: 400,
    },

    shadows: {
      card: "0 4px 16px rgba(0,0,0,0.5)",
      button: "0 2px 10px rgba(231, 29, 43, 0.3)",
    },

    borderRadius: {
      sm: "8px",
      md: "12px",
      lg: "20px",
    },
  },
};
