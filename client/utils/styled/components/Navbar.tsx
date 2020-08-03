import styled, { DefaultTheme } from "styled-components";
import { Props } from "./components";

export const Logo: React.FC<{ className?: string }> = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: "Amaranth";
  font-size: 2.2rem;
  letter-spacing: 1px;
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SearchBar: React.FC<Props> = styled.div`
  width: 282px;

  ${({ theme }) => theme.media.tabletAndBelow} {
    width: unset;
    max-width: 350px;
    margin: 0 auto;
    padding-bottom: 1rem;
  }
`;

export const StyledNavbar: React.FC<Props> = styled.div`
  margin: 0 auto;
  align-items: center;
  background: unset;
  max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
  width: 100%;
  margin: 0 auto;

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
`;

export const PrimaryNavbar: React.FC<Props> = styled.div`
  background: ${({ theme }) => theme.colors.dark700};
`;

export const SecondaryNavbar: React.FC<Props> = styled.div`
  background: ${({ theme }) => theme.colors.dark600};
`;

export const NavbarLink: React.FC<
  Props & { onClick?: Function }
> = styled.a.attrs({
  className: "navbar-item",
})`
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
        width: 20%;
        left: 40%;
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

export const NavbarDropdown: React.FC<
  Props & { reverse?: boolean }
> = styled.div`
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
