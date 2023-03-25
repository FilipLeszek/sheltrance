import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Example title for all pages</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleAnalytics trackPageViews />
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(App);