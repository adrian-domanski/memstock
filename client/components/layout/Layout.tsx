import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import TopMems from "../Mem/TopMems";
import TopUsers from "../Mem/TopUsers";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import Head from "next/head";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box !important;
  }

  ${({ theme }) => theme.media.mobile} {
    html {
      font-size: 15px;
    }
  }

  

  body {
    background-color: #3A3A3A;
    overflow-x: hidden;
    color: ${({ theme }) => theme.colors.white500} ;
  }

  #__next {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    width: 100%;
    min-height: 100vh;
  }
`;

const MainContent = styled.main`
  max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
  width: 100vw;
  padding: 1rem;
  margin: 2rem auto;

  @media screen and (max-width: 1023px) {
    margin: 1rem auto;
  }
`;

interface Props {
  popularMems?: boolean;
  topUsers?: boolean;
  ogImage?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogTitle?: string;
  ogType?: "article" | "website";
}

const Layout: React.FC<Props> = ({
  children,
  popularMems = false,
  topUsers = false,
  ogDescription = "Zbiór najlepszych memów i śmiesznych obrazków. Twórz swoje własne memy korzystając z naszych szablonów, lub dodaj własne zdjęcia i dziel się nimi z innymi.",
  ogTitle = "MemStock - Zbiór najlepszych memów i śmiesznych obrazków",
  ogImage = `${process.env.CLIENT_URL}/banner.png`,
  ogUrl = process.env.CLIENT_URL,
  ogType = "website",
}) => {
  return (
    <>
      <Head>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={ogUrl} />
        <title>MemStock - Zbiór najlepszych memów i śmiesznych obrazków</title>
      </Head>
      <GlobalStyles />
      <Navbar />
      <MainContent>
        {popularMems || topUsers ? (
          <div className="columns is-multiline">
            <div className="column is-12-tablet is-8-desktop">{children}</div>
            <div className="column is-12-tablet is-4-desktop">
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
