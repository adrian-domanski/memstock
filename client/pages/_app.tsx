import { getDataFromTree } from "@apollo/react-ssr";
import cookies from "next-cookies";
import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import AuthContextProvider from "../context/authContext";
import withApollo from "../lib/withApollo";
import { theme } from "../utils/styled/theme";
import "../utils/styles/main.scss";

class MyApp extends App<
  Readonly<any> &
    Readonly<{
      children?: React.ReactNode;
    }>
> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, token: cookies(ctx).token || "" };
  }
  render() {
    const { Component, pageProps, token } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <AuthContextProvider token={token}>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp, { getDataFromTree });
