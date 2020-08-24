import styled from "styled-components";

export const StyledFooter = styled.footer``;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey600};
  .accent {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
