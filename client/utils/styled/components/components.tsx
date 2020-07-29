import styled from "styled-components";

export interface Props {
  className?: string;
  role?: string;
  src?: string;
  alt?: string;
}

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

export const Input = styled.input.attrs({
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
