import React, { useEffect, useState } from "react";
import MemItem from "./MemItem";
import { useQuery } from "@apollo/react-hooks";
import { getMemsQuery } from "../../queries/memQueries";
import Loader from "../Loader";

const MemList: React.FC = () => {
  const MEMS_FETCH_MORE_AMOUNT = 2;
  const [offset, setOffset] = useState(2);

  const { data, loading, fetchMore } = useQuery(getMemsQuery, {
    variables: { limit: 2, start: 0 },
  });

  const fetchMoreResults = async () => {
    await fetchMore({
      variables: { limit: MEMS_FETCH_MORE_AMOUNT, start: offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setOffset(offset + MEMS_FETCH_MORE_AMOUNT);

        return { ...prev, mems: [...prev.mems, ...fetchMoreResult.mems] };
      },
    });
  };

  return (
    <>
      {!loading ? (
        data.mems.map((mem) => mem.image && <MemItem key={mem.id} mem={mem} />)
      ) : (
        <Loader />
      )}
      <button onClick={fetchMoreResults}>xxx</button>
    </>
  );
};

export default MemList;
