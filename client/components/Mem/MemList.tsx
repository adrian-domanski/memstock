import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { getMemsQuery } from "../../queries/memQueries";
import { Button, ContentBody } from "../../utils/styled/components/components";
import { mediaCheckTypes, MemType } from "../../utils/types";
import Loader from "../Loader";
import MemItem from "./MemItem/MemItem";
import {
  MemItemHeader,
  MemItemBody,
  MemItemFooter,
} from "../../utils/styled/components/MemItem";
import Link from "next/link";

interface Props {
  where?: object;
  memsForCheck?: mediaCheckTypes;
  userMemList?: boolean;
  sort?: string;
}

const MemList: React.FC<Props> = ({
  where = { isPublic: true },
  memsForCheck,
  userMemList,
  sort = "createdAt:DESC",
}) => {
  const MEMS_FETCH_MORE_AMOUNT = 10;
  const MEMS_ON_START = 5;

  const [offset, setOffset] = useState(MEMS_ON_START);
  const [hasMore, setHasMore] = useState(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, loading, fetchMore, updateQuery } = useQuery(getMemsQuery, {
    variables: { limit: MEMS_ON_START, start: 0, where, sort },
    ssr: false,
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
          {data?.mems?.length ? (
            data.mems.map(
              (mem: MemType) =>
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
            <ContentBody className="is-size-4-desktop is-size-5-mobile  has-text-centered py-5">
              <p>Brak wyników</p>
              {!userMemList && (
                <Link href="/" passHref>
                  <Button as="a" className="is-primary center mt-5">
                    Wróć do strony głownej
                  </Button>
                </Link>
              )}
            </ContentBody>
          )}
        </InfiniteScroll>
      ) : (
        <>
          <MemItemHeader />
          <MemItemBody>
            <Loader />
          </MemItemBody>
          <MemItemFooter />
        </>
      )}
    </>
  );
};

export default MemList;
