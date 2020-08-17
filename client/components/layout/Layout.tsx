import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import styled, { createGlobalStyle } from "styled-components";
import TopMems from "../Mem/TopMems";
import TopUsers from "../Mem/TopUsers";

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

const MainContent = styled.main.attrs({ className: "section" })`
  max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
  width: 100%;
  margin: 0 auto;
`;

interface Props {
  popularMems?: boolean;
  topUsers?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  popularMems = false,
  topUsers = false,
}) => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <MainContent>
        {popularMems || topUsers ? (
          <div className="columns">
            <div className="column is-8-desktop">{children}</div>
            <div className="column is-4-desktop">
              {popularMems && <TopMems />}
              {topUsers && <TopUsers />}
            </div>
          </div>
        ) : (
          children
        )}
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout;
