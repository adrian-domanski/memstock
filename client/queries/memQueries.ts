import gql from "graphql-tag";

export const getMemsQuery = gql`
  query {
    mems {
      id
      title
      categories {
        id
        name
      }
      user {
        username
        rank
      }
      image {
        url
      }
      likes
      dislikes
    }
  }
`;

export const getTopMems = gql`
  query {
    mems(sort: "likes:DESC", limit: 3) {
      id
      title
      categories {
        id
        name
      }
      user {
        username
        rank
      }
      image {
        url
      }
      likes
      dislikes
    }
  }
`;
