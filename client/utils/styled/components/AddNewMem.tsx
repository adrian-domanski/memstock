import styled from "styled-components";

export const InlineButton = styled.button`
  &&& {
    background: unset;
    border: none;
    padding: 0;
    display: block;
    justify-content: flex-start;

    :hover {
      color: ${({ theme }) => theme.colors.primaryDarker};
    }

    :active,
    :focus {
      outline: none;
      box-shadow: unset;
      border: none;
    }
  }
`;

export const CustomMemLink = styled.a`
  word-break: break-all;
`;
