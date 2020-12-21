import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import React from "react";
import { getCategoriesQuery } from "../../../queries/memQueries";
import {
  FooterContent,
  StyledFooter,
} from "../../../utils/styled/components/Footer";
import { Paragraph } from "../../../utils/styled/components/Paragraph";
import { CategoryType } from "../../../utils/types";
import {
  SecondaryFooter,
  WideWrapper,
  FooterTitle,
  GridList,
  GridListItem,
  PrimaryFooter,
} from "./styled";

const Footer: React.FC = () => {
  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    getCategoriesQuery
  );

  return (
    <StyledFooter>
      <SecondaryFooter>
        <WideWrapper>
          <div className="columns has-text-centered-mobile">
            <div className="column is-4">
              <div className="section">
                <FooterTitle>Kategorie</FooterTitle>
                <GridList has2columns>
                  {!categoriesLoading &&
                    categoriesData?.categories?.map(
                      (category: CategoryType) => (
                        <GridListItem key={category.id}>
                          <Link
                            href={{
                              pathname: "/",
                              query: { category: category.name },
                            }}
                          >
                            <a className="is-link">{category.name}</a>
                          </Link>
                        </GridListItem>
                      )
                    )}
                </GridList>
              </div>
            </div>
            <div className="column is-4">
              <div className="section">
                <FooterTitle>Przydatne linki</FooterTitle>
                <GridList>
                  <GridListItem>
                    <Link href="/">
                      <a className="is-link">Strona główna</a>
                    </Link>
                  </GridListItem>
                  <GridListItem>
                    <Link href="/dodaj-mema">
                      <a className="is-link">Dodaj mema</a>
                    </Link>
                  </GridListItem>
                  <GridListItem>
                    <Link href="/generator-memow">
                      <a className="is-link">Generator memów</a>
                    </Link>
                  </GridListItem>
                  <GridListItem>
                    <Link href="/ranking">
                      <a className="is-link">Ranking</a>
                    </Link>
                  </GridListItem>
                </GridList>
              </div>
            </div>
          </div>
        </WideWrapper>
      </SecondaryFooter>
      <PrimaryFooter>
        <WideWrapper>
          <FooterContent>
            <p className="page-name">
              <span className="accent">&copy; Mem</span>
              <span className="has-text-primary">Stock</span>&nbsp;
            </p>
            <p className="copyrights">
              {new Date().getFullYear()} - Wszelkie prawa zastrzeżone
            </p>
          </FooterContent>
        </WideWrapper>
      </PrimaryFooter>
    </StyledFooter>
  );
};

export default Footer;
