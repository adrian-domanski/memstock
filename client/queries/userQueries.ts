import gql from "graphql-tag";

export const getUserDetailsQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      username
      avatar {
        url
      }
      rank
      mems(limit: 10, sort: "createdAt:DESC") {
        id
        title
        categories {
          id
          name
        }
        image {
          url
        }
        likes
        dislikes
      }
    }
  }
`;

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
        role {
          name
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
        role {
          name
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
      role {
        name
      }
    }
  }
`;
