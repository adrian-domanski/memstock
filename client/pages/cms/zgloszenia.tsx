import React from "react";
import Layout from "../../components/layout/Layout";
import MemList from "../../components/Mem/MemList";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";
import {
  ContentHeader,
  StyledTitleWithLine,
} from "../../utils/styled/components/components";
import { mediaCheckTypes } from "../../utils/types";

const ReportedMedia: React.FC = () => {
  return (
    <Layout>
      <div className="columns mt-5 mb-6">
        <div className="column is-8-desktop">
          <ContentHeader className="mb-4">
            <StyledTitleWithLine className="is-size-4">
              Zgłoszenia - do sprawdzenia
            </StyledTitleWithLine>
          </ContentHeader>
          <MemList
            where={{ isReported: true }}
            sort={"createdAt:DESC"}
            memsForCheck={mediaCheckTypes.FOR_REPORT}
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

export default ReportedMedia;
