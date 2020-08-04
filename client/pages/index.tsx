import React from "react";
import Layout from "../components/layout/Layout";
import MemList from "../components/Mem/MemList";
import TopMems from "../components/Mem/TopMems";
import TopUsers from "../components/Mem/TopUsers";

const index: React.FC = () => {
  return (
    <Layout>
      <div className="columns mt-5 mb-6">
        <div className="column is-8-desktop">
          <MemList />
        </div>
        <div className="column is-4-desktop">
          <TopMems />
          <TopUsers />
        </div>
      </div>
    </Layout>
  );
};

export default index;
