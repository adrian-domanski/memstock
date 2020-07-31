import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getMemDetailsQuery } from "../../queries/memQueries";
import Layout from "../../components/layout/Layout";
import { PageWrapper } from "../../utils/styled/components/components";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";
import MemItem from "../../components/Mem/MemItem";
import Loader from "../../components/Loader";
import { SingletonRouter, withRouter } from "next/router";
import MemComments from "../../components/Mem/MemComments";

interface Props {
  router: SingletonRouter;
}

const MemDetails: React.FC<Props> = ({ router }) => {
  const memId = router.query.mem_id;
  const { data, loading } = useQuery(getMemDetailsQuery, {
    variables: { id: memId },
  });

  return (
    <Layout>
      <PageWrapper>
        <div className="columns">
          <div className="column is-8-desktop">
            {!loading ? <MemItem mem={data.mem} /> : <Loader />}
            {!loading ? (
              <MemComments comments={data.mem.comments} />
            ) : (
              <Loader />
            )}
          </div>
          <div className="column is-4-desktop">
            <TopMems />
            <TopUsers />
          </div>
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default withRouter(MemDetails);
