import styled, { DefaultTheme } from "styled-components";

export const StyledAuthNavbar = styled.div`
  &&&& {
    @media screen and (max-width: 1023px) {
      justify-content: center;
      padding: 0;
    }
  }
`;

export const Logo = styled.figure`
  &&& {
    color: ${({ theme }) => theme.colors.primary};
    font-family: "Amaranth";
    font-size: 2.2rem;
    letter-spacing: 1px;
    padding-left: 0;
    span {
      color: ${({ theme }) => theme.colors.accent};
    }

    img {
      display: block;
      max-height: 2.75rem;
      margin-right: 8px;
    }
  }
`;

export const SearchBar = styled.div`
  width: 282px;
  position: relative;

  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
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
`;

export const StyledNavbar = styled.div`
  &&& {
    margin: 0 auto;
    align-items: center;
    background: unset;
    max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
    width: 100%;
    padding: 0.25rem 1rem;

    ${({ theme }) => theme.media.tabletAndBelow} {
      .navbar-burger {
        height: unset;
        color: ${({ theme }) => theme.colors.primary};
        &.is-active span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        span {
          height: 3px;
          width: 20px;
          left: calc(50% - 9px);
          :nth-child(1) {
            top: calc(50% - 7px);
          }
          :nth-child(3) {
            top: calc(50% + 5px);
          }
        }
      }

      @media screen and (max-width: 1023px) {
        .navbar-menu {
          .navbar-item.has-dropdown.is-hoverable,
          .navbar-dropdown {
            padding: 0;

            .navbar-link {
              display: none;
            }
          }
          background-color: ${({ theme }) => theme.colors.dark800};
          text-align: center;
          padding: 0;
          .navbar-item {
            color: #fff;
            font-size: 1rem;
            padding: 1.2rem 1rem;
            :hover {
              color: #fff;
              background-color: unset;
            }
          }
        }
      }
    }
  }
`;

export const PrimaryNavbar = styled.div`
  background: ${({ theme }) => theme.colors.dark700};
`;

export const SecondaryNavbar = styled.div`
  background: ${({ theme }) => theme.colors.dark600};

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const StyledAuthButtons = styled.div`
  @media screen and (max-width: 1023px) {
    &&& {
      display: flex;
      margin-bottom: 1rem;
    }
  }
`;

export const NavbarLink = styled.a.attrs(
  ({ className }: { className: string }) => ({
    className: `navbar-item ${className}`,
  })
)`
  &&& {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    position: relative;

    :after {
      content: "";
      display: block;
      width: 88%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
      position: absolute;
      bottom: 5px;
      left: 6%;
      transform: scaleX(0);
      transition: transform 0.1s ease-in;

      ${({ theme }) => theme.media.tabletAndBelow} {
        width: 40%;
        left: 30%;
      }
    }
    &.active:after {
      transform: scaleX(1);
    }
    :hover {
      color: ${({ theme }) => theme.colors.primary};
      background-color: unset;
      :after {
        transform: scaleX(1);
      }
    }
    :focus {
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.dark600};
    }

    ${({ theme }) => theme.media.desktop} {
      font-size: 1.1rem;
    }
  }
`;

export const NavbarDropdown = styled.div<{ reverse?: boolean }>`
  &&& {
    font-size: 1rem;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
      background-color: unset;
    }

    .navbar-divider {
      background-color: ${({ theme }) => theme.colors.dark600};
    }

    .navbar-item {
      color: ${({ theme }) => theme.colors.white500};

      ${({ theme }) => theme.media.tabletAndBelow} {
        color: ${({ theme }) => theme.colors.primary};
      }

      :hover {
        background-color: ${({ theme }) => theme.colors.dark800};

        ${({ theme }) => theme.media.desktop} {
          :after {
            display: none;
          }
        }
      }
    }

    .navbar-link {
      font-size: 1rem;
      color: ${({ theme, reverse }: any) =>
        reverse ? theme.colors.accent : theme.colors.primary};
      background-color: unset;

      :after {
        border-color: ${({
          theme,
          reverse,
        }: {
          theme: DefaultTheme;
          reverse: boolean;
        }) => (reverse ? theme.colors.primary : theme.colors.accent)};
      }

      :focus {
        color: ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.dark600};
      }

      ${({ theme }) => theme.media.desktop} {
        font-size: 1.1rem;
      }
    }

    @media screen and (min-width: 1024px) {
      .navbar-dropdown {
        background-color: ${({ theme }) => theme.colors.dark700};
        border-color: ${({ theme }) => theme.colors.dark600};
      }
    }
  }
`;
