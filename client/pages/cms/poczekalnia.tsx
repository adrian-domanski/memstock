import React from "react";
import Layout from "../../components/layout/Layout/Layout";
import MemList from "../../components/Mem/MemList";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";
import {
  ContentHeader,
  StyledTitleWithLine,
} from "../../utils/styled/components/components";
import { mediaCheckTypes } from "../../utils/types";

const WaitingForAccept: React.FC = () => {
  return (
    <Layout>
      <div className="columns">
        <div className="column is-8-desktop">
          <ContentHeader className="mb-4">
            <StyledTitleWithLine>Poczekalnia memów</StyledTitleWithLine>
          </ContentHeader>
          <MemList
            where={{ isPublic: false }}
            sort={"createdAt:DESC"}
            memsForCheck={mediaCheckTypes.FOR_PUBLICATION}
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
