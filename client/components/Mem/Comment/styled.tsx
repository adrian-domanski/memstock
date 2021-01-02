import styled from "styled-components";

import {
  ContentHeader,
  ContentBody,
} from "../../../utils/styled/components/components";

export const StyledComment = styled.article`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const CustomContentHeader = styled(ContentHeader)`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.dark800};

  .username {
    padding-left: 0.6rem;
    font-weight: 500;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CustomContentBody = styled(ContentBody)`
  background-color: ${({ theme }) => theme.colors.dark700};
  padding: 1rem 2rem;
  word-break: break-all;
`;

export const CommentInfo = styled.time`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.grey600};
  font-style: italic;
  display: flex;
  align-items: center;
`;

export const UnstyledDeleteCommentButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
  font-size: 1rem;
  i {
    transition: color 0.1s ease-out;
  }

  :hover i {
    color: #970a0a !important;
  }
`;
