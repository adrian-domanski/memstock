import React from "react";
import styled from "styled-components";
import {
  FooterContent,
  StyledFooter,
} from "../../utils/styled/components/Footer";

const PrimaryFooter = styled.div`
  background: ${({ theme }) => theme.colors.dark700};
  padding: 1rem;
`;

const SecondaryFooter = styled.div`
  background: ${({ theme }) => theme.colors.dark600};
`;

const WideWrapper = styled.div`
  max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
  width: 100%;
  margin: 0 auto;
`;

const GridList = styled.ul<{ has2columns?: boolean }>`
  display: grid;
  grid-template-columns: ${({ has2columns }) =>
    has2columns ? "1fr 1fr" : "1fr"};
`;

const GridListItem = styled.li`
  color: ${({ theme }) => theme.colors.white500};
  line-height: 2;
`;

const FooterTitle = styled.h3.attrs({
  className: "title is-size-3-mobile",
})`
  color: ${({ theme }) => theme.colors.primaryDarker};
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter className="has-text-centered-mobile">
      <SecondaryFooter>
        <WideWrapper>
          <div className="columns">
            <div className="column is-4">
              <div className="section">
                <FooterTitle>Kategorie</FooterTitle>
                <GridList has2columns>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                </GridList>
              </div>
            </div>
            <div className="column is-4">
              <div className="section">
                <FooterTitle>Przydatne linki</FooterTitle>
                <GridList>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                  <GridListItem>Beka</GridListItem>
                </GridList>
              </div>
            </div>
          </div>
        </WideWrapper>
      </SecondaryFooter>
      <PrimaryFooter>
        <WideWrapper>
          <FooterContent>
            <span className="accent">&copy; Mem</span>
            <span className="has-text-primary">Stock</span>&nbsp;
            {new Date().getFullYear()} - Wszelkie prawa zastrzeżone
          </FooterContent>
        </WideWrapper>
      </PrimaryFooter>
    </StyledFooter>
  );
};

export default Footer;
