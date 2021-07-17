import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#FFFFFF",
      dark: "#FFFFFF",
      contrastText: "#000000",
    },
    secondary: {
      light: "#000000",
      main: "#000000",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
    grey: {
      main: red.A400,
    },
    background: {
      default: "#fafafa",
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#f1f3f4",
        color: "#202124",
        border: "1px solid #f1f3f4",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "#f1f3f4",
          color: "#202124",
        },
      },
      containedSecondary: {
        backgroundColor: "#dadce0",
        color: "#202124",
        border: "1px solid #dadce0",
        borderRadius: "4px",
        boxSizing: "border-box",
        "&:hover": {
          backgroundColor: "#dadce0",
          color: "#202124",
        },
      },
    },
  },
});

export default theme;
