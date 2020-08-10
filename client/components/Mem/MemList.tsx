import React, { useState } from "react";
import MemItem from "./MemItem";
import { useQuery } from "@apollo/react-hooks";
import { getMemsQuery } from "../../queries/memQueries";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroller";
import { ContentBody } from "../../utils/styled/components/components";
import { Mem } from "../../utils/types";

interface Props {
  where?: object;
  memsForCheck?: boolean;
  sort?: string;
}

const MemList: React.FC<Props> = ({
  where = { isPublic: true },
  memsForCheck = false,
  sort = "createdAt:DESC",
}) => {
  const MEMS_FETCH_MORE_AMOUNT = 10;
  const MEMS_ON_START = 10;

  const [offset, setOffset] = useState(MEMS_ON_START);
  const [hasMore, setHasMore] = useState(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, loading, fetchMore, updateQuery } = useQuery(getMemsQuery, {
    variables: { limit: MEMS_ON_START, start: 0, where, sort },
  });

  const fetchMoreResults = async () => {
    if (fetchMoreLoading) return;
    setFetchMoreLoading(true);
    await fetchMore({
      variables: { limit: MEMS_FETCH_MORE_AMOUNT, start: offset, where },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.mems.length) {
          setHasMore(false);
          return prev;
        }

        setOffset(offset + MEMS_FETCH_MORE_AMOUNT);
        return { ...prev, mems: [...prev.mems, ...fetchMoreResult.mems] };
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
          {data.mems.length ? (
            data.mems.map(
              (mem: Mem) =>
                mem.image && (
                  <MemItem
                    key={mem.id}
                    mem={mem}
                    memForCheck={memsForCheck}
                    updateMemList={updateQuery}
                  />
                )
            )
          ) : (
            <ContentBody className="is-size-4 has-text-centered py-5">
              Brak wyników
            </ContentBody>
          )}
        </InfiniteScroll>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MemList;
