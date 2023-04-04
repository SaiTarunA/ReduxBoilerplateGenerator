import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Main from "./components/Main";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        light: "#de7d82",
        main: "#e96065",
        dark: "#ee5250",
      },
    },
    typography: {
      allVariants: {
        fontFamily: "'Space Grotesk', sans-serif",
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: "'Space Grotesk', sans-serif",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
