import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./constants/UserContext";
import Router1 from "./constants/Router1";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router1 />
      </UserProvider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
