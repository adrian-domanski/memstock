import styled from "styled-components";

export interface Props {
  className?: string;
  role?: string;
  as?: string;
}

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
`;

export const ContentBody: React.FC<Props> = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.dark600};
`;

export const ContentFooter: React.FC<Props> = styled.footer`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.dark700};
`;

export const PageWrapper: React.FC<Props> = styled.section.attrs({
  className: "section",
})``;

export const Button: React.FC<Props> = styled.button.attrs({
  className: "button",
})`
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

    :hover {
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

export const Input: React.FC<Props> = styled.input.attrs({
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
