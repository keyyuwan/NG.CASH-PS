import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "../contexts/AuthContext";

import { GlobalStyle } from "../styles/global";
import { theme } from "../styles/theme";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <ToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
