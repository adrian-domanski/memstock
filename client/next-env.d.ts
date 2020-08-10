/// <reference types="next" />
/// <reference types="next/types/global" />

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    pageMaxWidth: string;
    pageWideSectionMaxWidth: string;
    boxShadow: string;
    colors: {
      primary: string;
      success: string;
      primaryDarker: string;
      accent: string;
      accentDarker: string;
      danger: string;
      dark900: string;
      dark800: string;
      dark700: string;
      dark600: string;
      dark500: string;
      white500: string;
      grey500: string;
      grey600: string;
      grey700: string;
    };
    fontSize: {
      desktop: {
        title: string;
        subtitle: string;
        normal: string;
      };
      mobile: {
        normal: string;
        titleMobile: string;
        subtitleMobile: string;
      };
    };
    media: {
      desktop: string;
      tablet: string;
      mobile: string;
      tabletAndBelow: string;
    };
  }
}
