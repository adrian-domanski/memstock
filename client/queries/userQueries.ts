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

export const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        rank
        username
        avatar {
          url
          formats
        }
      }
      jwt
    }
  }
`;

export const loginMutation = gql`
  mutation($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      user {
        id
        rank
        username
        avatar {
          url
          formats
        }
      }
      jwt
    }
  }
`;

export const getUserFromTokenQuery = gql`
  query {
    me {
      id
      rank
      username
      avatar {
        url
        formats
      }
    }
  }
`;
