import "@opengovsg/design-system-react/build/fonts/inter.css";
import { ThemeProvider } from "@opengovsg/design-system-react";

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
