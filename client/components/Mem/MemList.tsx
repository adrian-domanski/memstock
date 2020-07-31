import React from "react";
import MemItem from "./MemItem";
import { useQuery } from "@apollo/react-hooks";
import { getMemsQuery } from "../../queries/memQueries";
import Loader from "../Loader";

const MemList: React.FC = () => {
  const { data, loading } = useQuery(getMemsQuery);

  console.log(data);

  return (
    <>
      {!loading ? (
        data.mems.map((mem) => <MemItem key={mem.id} mem={mem} />)
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MemList;
