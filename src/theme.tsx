import { useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { pink } from "@mui/material/colors";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  colorMode: "",
  setColorMode: (mode: "light" | "dark"): void => {},
});

export function ColorModeProvider({ children }: { children: any }) {
  const getInitialMode = (): "light" | "dark" => {
    const storedMode = localStorage.getItem("juke-theme");

    if (storedMode === "light" || !storedMode) {
      return "light";
    }

    return "dark";
  };
  const [mode, setMode] = useState<"light" | "dark">(getInitialMode());

  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const setColorMode = (mode: "light" | "dark") => {
    setMode(mode);
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: pink,
            background: {
              default: "#e2e8f0",
              paper: "#f1f5f9",
            },
          }
        : {
            primary: pink,
            background: {
              default: "#1e293b",
              paper: "#0f172a",
            },
          }),
    },
    typography: {
      h1: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      h2: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      h3: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      h4: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      h5: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      h6: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      fontFamily: ["PT Sans", "sans-serif"].join(","),
    },
  });

  useEffect(() => {
    localStorage.setItem("juke-theme", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider
      value={{ colorMode: mode, toggleColorMode, setColorMode }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorModeContext = () => useContext(ColorModeContext);
