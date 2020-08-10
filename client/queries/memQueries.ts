import gql from "graphql-tag";

export const createMemMutation = gql`
  mutation($title: String!, $categories: [ID]!, $image: ID!) {
    createMem(
      input: { data: { title: $title, categories: $categories, image: $image } }
    ) {
      mem {
        id
      }
    }
  }
`;

export const deleteMemMutation = gql`
  mutation($id: ID!) {
    deleteMem(input: { where: { id: $id } }) {
      mem {
        id
      }
    }
  }
`;

export const uploadFileMutation = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      id
    }
  }
`;

export const getCategoriesQuery = gql`
  query {
    categories {
      name
      id
    }
  }
`;

export const updateMemMutation = gql`
  mutation($input: updateMemInput!) {
    updateMem(input: $input) {
      mem {
        id
      }
    }
  }
`;

export const getMemsQuery = gql`
  query($limit: Int, $start: Int, $where: JSON, $sort: String) {
    mems(limit: $limit, start: $start, where: $where, sort: $sort) {
      id
      title
      categories {
        id
        name
      }
      user {
        username
        rank
        avatar {
          url
        }
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
