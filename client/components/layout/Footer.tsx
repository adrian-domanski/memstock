import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.dark700};
  padding: 1rem;
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <h1>My footer</h1>
    </StyledFooter>
  );
};

export default Footer;
