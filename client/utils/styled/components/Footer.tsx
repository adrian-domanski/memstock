import styled from "styled-components";

export const StyledFooter = styled.footer``;

export const FooterContent: React.FC = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey600};
  .accent {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
