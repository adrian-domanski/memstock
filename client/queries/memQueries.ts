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

export const countMemsQuery = gql`
  query($where: JSON!) {
    countMems(where: $where)
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
      isReported
      user {
        id
        username
        rank
        avatar {
          id
          url
        }
      }
      image {
        id
        url
      }
      likes
      dislikes
    }
  }
`;

export const getSearchHintsQuery = gql`
  query($limit: Int, $where: JSON, $sort: String) {
    mems(limit: $limit, where: $where, sort: $sort) {
      id
      title
    }
  }
`;

export const addCommentMutation = gql`
  mutation($userId: ID!, $content: String!, $memId: ID!) {
    createComment(
      input: { data: { user: $userId, content: $content, mem: $memId } }
    ) {
      comment {
        id
      }
    }
  }
`;

export const getMemDetailsQuery = gql`
  query($id: ID!) {
    mem(id: $id) {
      id
      title
      isReported
      categories {
        id
        name
      }
      user {
        id
        username
        rank
        avatar {
          id
          url
        }
      }
      image {
        id
        url
      }
      likes
      dislikes
      comments(sort: "createdAt:DESC") {
        id
        createdAt
        content
        user {
          id
          username
          rank
          avatar {
            id
            url
          }
        }
      }
    }
  }
`;

export const getTopMems = gql`
  query {
    mems(sort: "likes:DESC", limit: 3, where: { isPublic: true }) {
      id
      title
      categories {
        id
        name
      }
      user {
        id
        username
        rank
      }
      image {
        id
        url
      }
      likes
      dislikes
    }
  }
`;
