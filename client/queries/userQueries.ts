import gql from "graphql-tag";

export const getUsersQuery = gql`
  query($limit: Int, $start: Int, $where: JSON, $sort: String) {
    users(limit: $limit, start: $start, where: $where, sort: $sort) {
      id
      username
      rank
      avatar {
        id
        url
      }
    }
  }
`;

export const countUsersQuery = gql`
  query($where: JSON!) {
    countUsers(where: $where)
  }
`;

export const updateUserMutation = gql`
  mutation($input: updateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        avatar {
          id
          url
        }
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
          id
          url
        }
        role {
          id
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
          id
          url
          formats
        }
        role {
          id
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
        id
        url
        formats
      }
      role {
        id
        name
      }
    }
  }
`;

export const getUserDetailsQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      avatar {
        id
        url
      }
      rank
      createdAt
      mems(limit: 10, sort: "createdAt:DESC") {
        id
        title
        categories {
          id
          name
        }
        image {
          id
          url
        }
        likes
        dislikes
      }
    }
  }
`;
