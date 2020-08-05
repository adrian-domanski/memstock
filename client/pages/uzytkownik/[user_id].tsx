import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../components/layout/Layout";
import {
  PageWrapper,
  ContentHeader,
} from "../../utils/styled/components/components";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";
import Loader from "../../components/Loader";
import { SingletonRouter, withRouter } from "next/router";
import { getUserDetailsQuery } from "../../queries/userQueries";

interface Props {
  router: SingletonRouter;
}

const UserDetails: React.FC<Props> = ({ router }) => {
  const userId = router.query.user_id;
  const { data, loading } = useQuery(getUserDetailsQuery, {
    variables: { id: userId },
  });

  return (
    <Layout>
      <PageWrapper>
        <div className="columns">
          <div className="column is-8-desktop">
            <ContentHeader>
              {!loading ? <>{data.user.username}</> : <Loader />}
            </ContentHeader>
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

export default withRouter(UserDetails);
