import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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

export const MainContent = styled.main`
  max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
  width: 100vw;
  padding: 1rem;
  margin: 2rem auto;

  @media screen and (max-width: 1023px) {
    margin: 1rem auto;
  }
`;
