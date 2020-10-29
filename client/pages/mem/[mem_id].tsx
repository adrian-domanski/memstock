import { useQuery } from "@apollo/react-hooks";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/Loader";
import MemComments from "../../components/Mem/MemComments";
import MemItem from "../../components/Mem/MemItem";
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
    <Layout
      ogImage={`${process.env.SERVER_URL}${data?.mem?.image?.url}`}
      ogTitle={data?.mem?.title}
      ogType="article"
      ogUrl={`${process.env.CLIENT_URL}/mem/${data?.mem?.id}`}
      topUsers
      popularMems
    >
      {!loading && data?.mem ? (
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
      {!loading && data?.mem ? (
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
    </Layout>
  );
};

export default withRouter(MemDetails);
