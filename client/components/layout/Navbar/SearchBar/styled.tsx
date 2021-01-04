import styled from "styled-components";

export const SearchResults = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.colors.dark800};
  width: 100%;

  li.info,
  li > a {
    padding: 0.5rem 1rem;
  }

  li a {
    display: block;
    width: 100%;
    height: 100%;
  }

  li.selected {
    background-color: ${({ theme }) => theme.colors.dark900};
  }
`;

export const SearchBar = styled.form`
  &&& {
    width: 282px;
    position: relative;
    display: flex;

    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      width: 100%;
      border-color: ${({ theme }) => theme.colors.dark500} !important;

      :active,
      :focus {
        border-color: ${({ theme }) => theme.colors.primary} !important;
      }
    }

    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    ${({ theme }) => theme.media.tabletAndBelow} {
      width: unset;
      max-width: 350px;
      margin: 0 auto;
      padding: 0 0.5rem 1rem 0.5rem;
    }
  }
`;
