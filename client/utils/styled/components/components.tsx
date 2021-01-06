import styled from "styled-components";

export interface Props {
  className?: string;
  role?: string;
  as?: string;
}

export const StyledBreadcrumb = styled.nav`
  &&& {
    background: ${({ theme }) => theme.colors.dark800};
    padding: 1.5rem 2rem;

    li a {
      color: ${({ theme }) => theme.colors.accent};
      transition: color 0.1s ease;

      :hover {
        color: ${({ theme }) => theme.colors.accentDarker};
      }
    }

    li.is-active a {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;
    }
  }
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.2s ease-out;
  cursor: pointer;

  :hover {
    color: #a37800;
  }
`;

export const StyledTabs = styled.div`
  &&& {
    ul li a {
      transition: color 0.1s ease;
    }
    ul {
      border-bottom-color: ${({ theme }) => theme.colors.dark700};
      justify-content: center;
    }

    a {
      color: ${({ theme }) => theme.colors.white500};
      border-bottom-color: ${({ theme }) => theme.colors.dark700};
    }

    &.is-accent {
      ul li.is-active a,
      ul li:hover a {
        color: ${({ theme }) => theme.colors.accent};
        border-bottom-color: ${({ theme }) => theme.colors.accent};
      }

      ul li:hover a {
        color: ${({ theme }) => theme.colors.accentDarker};
        border-bottom-color: ${({ theme }) => theme.colors.accentDarker};
      }
    }
  }
`;

export const LogoSubText: React.FC<Props> = styled.h2.attrs({
  className: "is-size-3",
})`
  font-family: "Amaranth";
  color: ${({ theme }) => theme.colors.primary};
`;

export const ContentHeader: React.FC<Props> = styled.header`
  background: ${({ theme }) => theme.colors.dark700};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
`;

export const ContentBody = styled.div`
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.colors.dark600};

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
`;

export const ContentFooter: React.FC<Props> = styled.footer`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.dark700};

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
`;

export const StyledTextArea = styled.textarea`
  background: ${({ theme }) => theme.colors.dark800};
  border-color: ${({ theme }) => theme.colors.dark800};
  color: ${({ theme }) => theme.colors.white500};

  ::placeholder {
    color: ${({ theme }) => theme.colors.grey700};
  }
`;

export const Button = styled.button.attrs(
  ({ className, as }: { className?: string; as?: string }) => ({
    className: `button ${className}`,
    as,
  })
)`
  &&& {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.dark700};
    padding-left: 2rem;
    padding-right: 2rem;
    z-index: 1;
    display: table;
    position: relative;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    overflow: hidden;
    font-size: 1.1rem;
    letter-spacing: 1px;

    :hover:not(::disabled) {
      background: ${({ theme }) => theme.colors.primaryDarker};
      color: black;
    }

    &.light {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: 1px solid ${({ theme }) => theme.colors.primary};

      :hover:not(::disabled) {
        background: ${({ theme }) => theme.colors.primary};
        color: black;
      }
    }

    :focus,
    :active {
      outline: auto 2px -webkit-focus-ring-color;
      outline-offset: 2px;
    }

    &.center {
      margin: 0 auto;
    }
  }
`;

export const StyledSelect: React.FC<Props> = styled.div`
  &&& {
    select {
      background: ${({ theme }) => theme.colors.dark800};
      border-color: ${({ theme }) => theme.colors.dark800};
      color: ${({ theme }) => theme.colors.white500};

      ::placeholder {
        color: ${({ theme }) => theme.colors.grey700};
      }

      :hover {
        border-color: #5a5a5a;
      }
    }

    :not(.is-multiple):not(.is-loading)::after {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Input = styled.input.attrs(
  ({ className }: { className?: string }) => ({
    className: `${className} input is-fullwidth`,
  })
)`
  width: unset;
  background-color: ${({ theme }) => theme.colors.dark500};
  border-color: ${({ theme }) => theme.colors.dark800};
  color: ${({ theme }) => theme.colors.white500};

  @media screen and (max-width: 1023px) {
    width: 100%;
  }

  &:active,
  &:focus {
    box-shadow: none !important;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.grey500};
  }
`;

export const StyledTitle: React.FC<Props> = styled.h2`
  &&& {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
    width: 100%;
  }
`;

export const StyledTitleWithLine = styled.h2`
  color: ${({ theme }) => theme.colors.white500};
  position: relative;
  padding-left: 0.8rem;
  font-size: 1.5rem;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }

  :before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;
