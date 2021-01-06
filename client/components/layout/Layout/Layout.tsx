import React from "react";
import TopMems from "../../Mem/TopMems";
import TopUsers from "../../Mem/TopUsers";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Head from "next/head";
import { GlobalStyles, MainContent } from "./styled";

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
        <title>{ogTitle}</title>
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
