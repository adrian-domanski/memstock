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

export const getMemDetailsQuery = gql`
  query($id: ID!) {
    mem(id: $id) {
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
      comments {
        id
        content
        user {
          username
          avatar {
            url
          }
        }
      }
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
