import styled from "styled-components";

export const Styled404Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 60vh;

  h1 {
    font-weight: bold;
    margin: 1.5rem 0;
  }

  i {
    font-size: 6rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
