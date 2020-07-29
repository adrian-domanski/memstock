import React from "react";
import App from "next/app";
import withApollo from "../lib/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import cookies from "next-cookies";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/styled/theme";
import "../utils/styles/main.scss";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, credentials: cookies(ctx).credentials || "" };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp, { getDataFromTree });
