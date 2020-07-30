import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  pageMaxWidth: "1000px",
  pageWideSectionMaxWidth: "1400px",
  boxShadow: "5px 5px 20px 0px rgba(0, 0, 0, 0.1)",
  colors: {
    primary: "#D69D00",
    success: "#48C774",
    primaryDarker: "#ad8108",
    accent: "#41B4B0",
    danger: "#FF3860",
    dark700: "#2B2B2B",
    dark800: "#252525",
    dark600: "#2E2E2E",
    dark500: "#4a4a4a",
    white500: "#E9E9E9",
    grey500: "#cccccc",
    grey600: "#a5a5a5",
  },
  fontSize: {
    desktop: {
      title: "2rem",
      subtitle: "1.5rem",
      normal: "1.1rem",
    },
    mobile: {
      normal: "1rem",
      titleMobile: "1.5rem",
      subtitleMobile: "1.1rem",
    },
  },
  media: {
    desktop: "@media screen and (min-width: 1024px)",
    tablet: "@media screen and (min-width: 769px)",
    mobile: "@media screen and (max-width: 768px)",
    tabletAndBelow: "@media screen and (max-width: 1023px)",
  },
};
