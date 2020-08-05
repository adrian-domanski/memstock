import React from "react";
import styled from "styled-components";
import MemActions from "./MemActions";
import {
  StyledTitle,
  ContentFooter,
  Button,
} from "../../utils/styled/components/components";
import { useQuery } from "@apollo/react-hooks";
import { getTopUsersQuery } from "../../queries/userQueries";
import Loader from "../Loader";
import Link from "next/link";

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
      border-radius: 50%;
    }

    figcaption {
      padding-left: 8px;
    }
  }
`;

const TopUsers: React.FC = () => {
  const { data, loading } = useQuery(getTopUsersQuery);

  return (
    <StyledPopularSection>
      <PopularSectionHeader>
        <StyledTitle>Ranking</StyledTitle>
      </PopularSectionHeader>
      <PopularSectionBody>
        {!loading ? (
          <RankingList>
            {data.users.map(({ username, rank, id, avatar }) => (
              <RankingListItem key={id}>
                <Link href="/uzytkownik/[user_id]" as={`/uzytkownik/${id}`}>
                  <a>
                    <figure>
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
                    </figure>
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
        <Button className="is-primary margin-auto light">Zobacz ranking</Button>
      </ContentFooter>
    </StyledPopularSection>
  );
};

export default TopUsers;
