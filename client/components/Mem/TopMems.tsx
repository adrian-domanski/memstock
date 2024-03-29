import { useQuery } from "@apollo/react-hooks";
import React from "react";
import styled from "styled-components";
import { getTopMems } from "../../queries/memQueries";
import { StyledTitle } from "../../utils/styled/components/components";
import Loader from "../Loader";
import MemTile from "./MemTile";
import {
  StyledMemItem,
  MemItemBody,
} from "../../utils/styled/components/MemItem";
import { MemType } from "../../utils/types";

const StyledPopularSection = styled.article`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
  box-shadow: ${({ theme }) => theme.boxShadow};

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const PopularSectionHeader = styled.header`
  background: ${({ theme }) => theme.colors.dark700};
  padding: 1rem 2rem;
  text-align: center;
  height: 80px;

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    font-size: 2rem;
  }
`;

const PopularSectionBody = styled.div`
  background: ${({ theme }) => theme.colors.dark600};

  .mem-title {
    color: ${({ theme }) => theme.colors.white500};
    font-size: 1.5rem;
  }

  .mem-categories {
    display: flex;

    li {
      color: ${({ theme }) => theme.colors.primary};
      :not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;

const TopMems: React.FC = () => {
  const { data, loading } = useQuery(getTopMems, { ssr: false });

  return (
    <StyledPopularSection>
      <PopularSectionHeader>
        <StyledTitle>Popularne</StyledTitle>
      </PopularSectionHeader>
      <PopularSectionBody>
        {!loading ? (
          data?.mems?.map(
            (mem: MemType) => mem.image && <MemTile key={mem.id} mem={mem} />
          )
        ) : (
          <StyledMemItem>
            <MemItemBody>
              <Loader />
            </MemItemBody>
          </StyledMemItem>
        )}
      </PopularSectionBody>
    </StyledPopularSection>
  );
};

export default TopMems;
