import React from "react";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";

const App = () => (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router />
    </>
  </ThemeProvider>
);

export default App;
