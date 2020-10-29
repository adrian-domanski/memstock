import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { getUsersQuery } from "../../queries/userQueries";
import {
  Button,
  ContentFooter,
  StyledTitle,
} from "../../utils/styled/components/components";
import Loader from "../Loader";
import { Avatar } from "../../utils/styled/components/MemItem";

export const StyledPopularSection = styled.article`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
  box-shadow: ${({ theme }) => theme.boxShadow};

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const PopularSectionHeader = styled.header`
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

export const PopularSectionBody = styled.div`
  background: ${({ theme }) => theme.colors.dark600};
  padding: 1rem 0;
`;

export const RankingList = styled.ul`
  text-align: center;
  line-height: 3;
`;

export const RankingListItem = styled.li`
  font-size: 1.2rem;

  a {
    color: ${({ theme }) => theme.colors.accent};
    transition: color 0.2s ease-in;

    :hover {
      color: #28908d;
    }
  }

  figure {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    figcaption {
      padding-left: 8px;
    }
  }
`;

const TopUsers: React.FC = () => {
  const { data, loading } = useQuery(getUsersQuery, {
    ssr: false,
    variables: { sort: "rank:DESC", limit: 10 },
  });

  return (
    <StyledPopularSection>
      <PopularSectionHeader>
        <StyledTitle>Ranking</StyledTitle>
      </PopularSectionHeader>
      <PopularSectionBody>
        {!loading ? (
          <RankingList>
            {data?.users?.map(({ username, rank, id, avatar }) => (
              <RankingListItem key={id}>
                <Link href="/uzytkownik/[user_id]" as={`/uzytkownik/${id}`}>
                  <a>
                    <Avatar>
                      <img
                        src={
                          avatar
                            ? `${process.env.SERVER_URL}${avatar.url}`
                            : `/img/avatar-placeholder.jpg`
                        }
                        alt={`Zdjęcie profilowe użytkownika ${username}`}
                      />
                      <figcaption>
                        {username} ({rank} pkt)
                      </figcaption>
                    </Avatar>
                  </a>
                </Link>
              </RankingListItem>
            ))}
          </RankingList>
        ) : (
          <Loader />
        )}
      </PopularSectionBody>
      <ContentFooter>
        <Link href="/ranking">
          <Button as="a" className="is-primary margin-auto light">
            Zobacz ranking
          </Button>
        </Link>
      </ContentFooter>
    </StyledPopularSection>
  );
};

export default TopUsers;
