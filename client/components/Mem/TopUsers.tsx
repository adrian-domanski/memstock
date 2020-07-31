import React from "react";
import styled from "styled-components";
import MemActions from "./MemActions";
import {
  StyledTitle,
  ContentFooter,
  Button,
} from "../../utils/styled/components/components";
import MemTile from "./MemTile";

const StyledPopularSection = styled.article`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }

  box-shadow: ${({ theme }) => theme.boxShadow};
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
  padding: 1rem 0;
`;

const RankingList = styled.ul`
  text-align: center;
  line-height: 3;
`;

const RankingListItem = styled.li`
  font-size: 1.2rem;

  figure {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 40px;
      border-radius: 50%;
    }

    figcaption {
      padding-left: 8px;
    }
  }
`;

const TopUsers: React.FC = () => {
  return (
    <StyledPopularSection>
      <PopularSectionHeader>
        <StyledTitle>Ranking</StyledTitle>
      </PopularSectionHeader>
      <PopularSectionBody>
        <RankingList>
          <RankingListItem>
            <figure>
              <img src="/img/avatar-placeholder.jpg" alt="" />
              <figcaption>Onyx352 (32 pkt)</figcaption>
            </figure>
          </RankingListItem>
          <RankingListItem>
            <figure>
              <img src="/img/avatar-placeholder.jpg" alt="" />
              <figcaption>Onyx352 (32 pkt)</figcaption>
            </figure>
          </RankingListItem>
          <RankingListItem>
            <figure>
              <img src="/img/avatar-placeholder.jpg" alt="" />
              <figcaption>Onyx352 (32 pkt)</figcaption>
            </figure>
          </RankingListItem>
          <RankingListItem>
            <figure>
              <img src="/img/avatar-placeholder.jpg" alt="" />
              <figcaption>Onyx352 (32 pkt)</figcaption>
            </figure>
          </RankingListItem>
          <RankingListItem>
            <figure>
              <img src="/img/avatar-placeholder.jpg" alt="" />
              <figcaption>Onyx352 (32 pkt)</figcaption>
            </figure>
          </RankingListItem>
        </RankingList>
      </PopularSectionBody>
      <ContentFooter>
        <Button className="is-primary margin-auto light">Zobacz ranking</Button>
      </ContentFooter>
    </StyledPopularSection>
  );
};

export default TopUsers;
