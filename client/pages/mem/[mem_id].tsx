import { useQuery } from "@apollo/react-hooks";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/Loader";
import MemComments from "../../components/Mem/MemComments";
import MemItem from "../../components/Mem/MemItem";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";
import { getMemDetailsQuery } from "../../queries/memQueries";
import {
  ContentBody,
  ContentFooter,
  ContentHeader,
} from "../../utils/styled/components/components";

interface Props {
  router: SingletonRouter;
}

const MemDetails: React.FC<Props> = ({ router }) => {
  const memId = router.query.mem_id.toString();
  const { data, loading } = useQuery(getMemDetailsQuery, {
    variables: { id: memId },
  });

  return (
    <Layout>
      <div className="columns">
        <div className="column is-8-desktop">
          {!loading ? (
            <MemItem mem={data.mem} />
          ) : (
            <>
              <ContentHeader />
              <ContentBody>
                <Loader />
              </ContentBody>
              <ContentFooter />
            </>
          )}
          {!loading ? (
            <MemComments memId={memId} comments={data.mem.comments} />
          ) : (
            <>
              <ContentHeader />
              <ContentBody>
                <Loader />
              </ContentBody>
              <ContentFooter />
            </>
          )}
        </div>
        <div className="column is-4-desktop">
          <TopMems />
          <TopUsers />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(MemDetails);
