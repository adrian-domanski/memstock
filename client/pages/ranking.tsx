import React from "react";
import Layout from "../components/layout/Layout/Layout";
import TopMems from "../components/Mem/TopMems";
import TopUsers from "../components/Mem/TopUsers";
import UserList from "../components/User/UserList";
import {
  ContentHeader,
  StyledTitle,
} from "../utils/styled/components/components";

const UsersRank = () => {
  return (
    <Layout>
      <div className="columns">
        <div className="column is-8-desktop">
          <ContentHeader className="mb-4">
            <StyledTitle className="has-text-centered">
              Ranking użytkowników
            </StyledTitle>
          </ContentHeader>
          <UserList />
        </div>
        <div className="column is-4-desktop">
          <TopMems />
          <TopUsers />
        </div>
      </div>
    </Layout>
  );
};

export default UsersRank;
