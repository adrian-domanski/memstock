import React from "react";
import Layout from "../../components/layout/Layout";
import MemList from "../../components/Mem/MemList";
import {
  ContentHeader,
  StyledTitleWithLine,
} from "../../utils/styled/components/components";
import { mediaCheckTypes } from "../../utils/types";

const ReportedMedia: React.FC = () => {
  return (
    <Layout topUsers popularMems>
      <ContentHeader className="mb-4">
        <StyledTitleWithLine>Zgłoszone memy</StyledTitleWithLine>
      </ContentHeader>
      <MemList
        where={{ isReported: true }}
        sort={"createdAt:DESC"}
        memsForCheck={mediaCheckTypes.FOR_REPORT}
      />
    </Layout>
  );
};

export default ReportedMedia;
