import { SingletonRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import MemList from "../components/Mem/MemList";
import TopMems from "../components/Mem/TopMems";
import TopUsers from "../components/Mem/TopUsers";
import {
  ContentHeader,
  PageWrapper,
  StyledTitle,
} from "../utils/styled/components/components";

interface Props {
  router: SingletonRouter;
}

const index: React.FC<Props> = ({ router }) => {
  const [whereFilter, setWhereFilter] = useState({
    isPublic: true,
    title_contains: "",
  });
  const params = router.query;

  useEffect(() => {
    if (params.title) {
      setWhereFilter({
        ...whereFilter,
        title_contains: params.title.toString(),
      });
    } else {
      setWhereFilter({
        ...whereFilter,
        title_contains: "",
      });
    }
  }, [params]);

  return (
    <Layout>
      <PageWrapper>
        <div className="columns">
          <div className="column is-8-desktop">
            {whereFilter.title_contains && (
              <ContentHeader className="mb-4">
                <StyledTitle>
                  Wyniki wyszukiwania dla frazy:{" "}
                  <span className="has-text-link">
                    "{whereFilter.title_contains}"
                  </span>
                </StyledTitle>
              </ContentHeader>
            )}
            <MemList where={whereFilter} />
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

export default withRouter(index);
