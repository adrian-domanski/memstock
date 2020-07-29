import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #3A3A3A
  }

  #__next {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
