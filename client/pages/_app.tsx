import { getDataFromTree } from "@apollo/react-ssr";
import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import AuthContextProvider from "../context/authContext";
import withApollo from "../lib/withApollo";
import { theme } from "../utils/styled/theme";
import "../utils/styles/main.scss";
import Head from "next/head";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>
            MemStock - Zbiór najlepszych memów i śmiesznych obrazków
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/icons/apple-icon-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/icons/android-icon-512x512.png"
          />
          <meta name="msapplication-TileColor" content="#D69D00" />
          <meta
            name="msapplication-TileImage"
            content="/icons/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#d69d00" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="Zbiór najlepszych memów i śmiesznych obrazków. Twórz swoje własne memy korzystając z naszych szablonów, lub dodaj własne zdjęcia i dziel się nimi z innymi."
          />
        </Head>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default withApollo(MyApp, { getDataFromTree });
