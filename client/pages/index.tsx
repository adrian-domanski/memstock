import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import MemList from "../components/Mem/MemList";
import TopMems from "../components/Mem/TopMems";
import TopUsers from "../components/Mem/TopUsers";
import { PageWrapper } from "../utils/styled/components/components";

const index: React.FC = () => {
  return (
    <Layout>
      <PageWrapper>
        <div className="columns">
          <div className="column is-8-desktop">
            <MemList />
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

export default index;
