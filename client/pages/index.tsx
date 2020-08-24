import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import Layout from "../components/layout/Layout";
import MemList from "../components/Mem/MemList";
import { isObjectEmpty } from "../utils/helpers";
import {
  ContentHeader,
  StyledTitle,
} from "../utils/styled/components/components";
import { IWhereFilter } from "../utils/types";

interface Props {
  router: SingletonRouter;
}

const index: React.FC<Props> = ({ router }) => {
  const params = router.query;
  const whereFilter: IWhereFilter = { isPublic: true };

  if (!isObjectEmpty(params)) {
    if (params.title) whereFilter.title_contains = params.title.toString();
    if (params.category)
      whereFilter.categories = { name: params.category.toString() };
  }

  return (
    <Layout topUsers popularMems>
      {whereFilter.categories || whereFilter.title_contains ? (
        <ContentHeader className="mb-4">
          <StyledTitle>
            Wyniki wyszukiwania dla{" "}
            {whereFilter.title_contains && (
              <>
                frazy:{" "}
                <span className="has-text-link">
                  "{whereFilter.title_contains}"
                </span>
              </>
            )}
            {whereFilter.categories && (
              <>
                kategorii:{" "}
                <span className="has-text-link">
                  "{whereFilter.categories.name}"
                </span>
              </>
            )}
          </StyledTitle>
        </ContentHeader>
      ) : null}
      <MemList where={whereFilter} />
    </Layout>
  );
};

export default withRouter(index);
