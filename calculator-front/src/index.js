import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PrimaryTheme from "providers/PrimaryTheme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={PrimaryTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
