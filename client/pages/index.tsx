import React from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import MemList from "../components/Mem/MemList";

const index: React.FC = () => {
  return (
    <Layout>
      <div className="columns py-6">
        <div className="column is-8-desktop">
          <MemList />
        </div>
        <div className="column is-4-desktop ">
          <section className="section has-background-info">hello</section>
        </div>
      </div>
    </Layout>
  );
};

export default index;
