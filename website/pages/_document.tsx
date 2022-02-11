import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "../components/theme";

const meta = {
  title: 'unboringSG',
  description: 'A website and browser extensions to discover things to eat, do, and learn.',
  cardImage: '/unboringsg_og.png',
};

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>{meta.title}</title>
          <meta name="robots" content="follow, index" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta content={meta.description} name="description" />
          <meta property="og:url" content="https://unboring-sg.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.cardImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@thorwebdev" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.cardImage} />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
