import "@opengovsg/design-system-react/build/fonts/inter.css";
import { ThemeProvider } from "@opengovsg/design-system-react";

import { AppProps } from "next/app";
import { theme } from "../components/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
