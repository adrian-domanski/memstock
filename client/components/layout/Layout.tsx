import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #3A3A3A;
    color: ${({ theme }) => theme.colors.white500};
  }

  #__next {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
  
`;

const MainContent = styled.main`
  max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
  width: 100%;
  margin: 0 auto;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
};

export default Layout;
