import styled from "styled-components";

export interface Props {
  className?: string;
  role?: string;
  as?: string;
}

export const StyledBreadcrumb = styled.nav`
  &&& {
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
  height: 80px;

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
`;

export const ContentBody: React.FC<Props> = styled.div`
  padding: 1rem;
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

export const PageWrapper: React.FC<Props> = styled.section.attrs({
  className: "section",
})``;

export const Button = styled.button.attrs(({ className }) => ({
  className: `button ${className}`,
}))`
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
    imfdgpp :hover {
      background: ${({ theme }) => theme.colors.primaryDarker};
      color: black;
    }

    &.light {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: 1px solid ${({ theme }) => theme.colors.primary};

      :hover {
        background: ${({ theme }) => theme.colors.primary};
        color: black;
      }
    }

    :active {
      border: 1px solid ${({ theme }) => theme.colors.primary};
      outline: none;
      box-shadow: none;
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

export const Input: React.FC<
  Props & { type: string; placeholder: string }
> = styled.input.attrs({
  className: "input",
})`
  background-color: ${({ theme }) => theme.colors.dark500};
  border: none;
  color: ${({ theme }) => theme.colors.white500};

  :active {
    outline: none;
    border: none;
    box-shadow: none;
  }

  :focus {
    box-shadow: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.grey500};
  }
`;

export const StyledTitle: React.FC<Props> = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
`;

export const StyledTitleWithLine = styled.h2`
  color: ${({ theme }) => theme.colors.white500};
  position: relative;
  padding-left: 0.8rem;

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
