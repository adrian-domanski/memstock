import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { getUsersQuery } from "../../queries/userQueries";
import { ContentBody } from "../../utils/styled/components/components";
import { UserType } from "../../utils/types";
import Loader from "../Loader";
import UserItem from "./UserItem";

const StyledList = styled.ul`
  list-style: none;
`;

interface Props {
  where?: object;
  sort?: string;
}

const UserList: React.FC<Props> = ({ where = {}, sort = "rank:DESC" }) => {
  const USERS_FETCH_MORE_AMOUNT = 20;
  const USERS_ON_START = 10;

  const [offset, setOffset] = useState(USERS_ON_START);
  const [hasMore, setHasMore] = useState(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, loading, fetchMore, updateQuery } = useQuery(getUsersQuery, {
    variables: { limit: USERS_ON_START, start: 0, where, sort },
  });

  const fetchMoreResults = async () => {
    if (fetchMoreLoading) return;
    setFetchMoreLoading(true);
    await fetchMore({
      variables: { limit: USERS_FETCH_MORE_AMOUNT, start: offset, where },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.users.length) {
          setHasMore(false);
          return prev;
        }

        setOffset(offset + USERS_FETCH_MORE_AMOUNT);
        return { ...prev, users: [...prev.users, ...fetchMoreResult.users] };
      },
    }).then(() => {
      setFetchMoreLoading(false);
    });
  };

  return (
    <>
      {!loading ? (
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={fetchMoreResults}
          loader={<Loader key={0} />}
        >
          <ContentBody className="is-size-4 py-5">
            {data.users.length ? (
              <StyledList>
                {data.users.map((user: UserType, index: number) => (
                  <UserItem key={user.id} index={index} user={user} />
                ))}
              </StyledList>
            ) : (
              <p>Brak wyników</p>
            )}
          </ContentBody>
        </InfiniteScroll>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserList;
