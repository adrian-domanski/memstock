import React from "react";
import Layout from "../../components/layout/Layout";
import MemList from "../../components/Mem/MemList";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";
import {
  ContentHeader,
  StyledTitleWithLine,
} from "../../utils/styled/components/components";

const WaitingForAccept: React.FC = () => {
  return (
    <Layout>
      <div className="columns mt-5 mb-6">
        <div className="column is-8-desktop">
          <ContentHeader className="mb-4">
            <StyledTitleWithLine className="is-size-4">
              Poczekalnia - do zatwierdzenia
            </StyledTitleWithLine>
          </ContentHeader>
          <MemList
            where={{ isPublic: false }}
            sort={"createdAt:DESC"}
            memsForCheck
          />
        </div>
        <div className="column is-4-desktop">
          <TopMems />
          <TopUsers />
        </div>
      </div>
    </Layout>
  );
};

export default WaitingForAccept;
