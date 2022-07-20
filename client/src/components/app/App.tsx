import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../../config/theme";
import { ItemList } from "./ItemList";
import { Header } from "./Header";
import React from "react";

function App() {
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem(`darkMode`) === 'true' ? true : false)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <ItemList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
