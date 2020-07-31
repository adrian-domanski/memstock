import gql from "graphql-tag";

export const getTopUsersQuery = gql`
  query {
    users(sort: "rank:DESC", limit: 5) {
      id
      rank
      username
      avatar {
        url
      }
    }
  }
`;
