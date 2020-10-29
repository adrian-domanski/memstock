import React from "react";
import { CommentType } from "../../utils/types";
import styled from "styled-components";
import {
  ContentHeader,
  ContentBody,
} from "../../utils/styled/components/components";
import { getRankName, formatDate } from "../../utils/helpers";
import { Avatar } from "../../utils/styled/components/MemItem";
import Link from "next/link";

interface Props {
  comment: CommentType;
}

const StyledComment = styled.article`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const CustomContentHeader = styled(ContentHeader)`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.dark800};

  .username {
    padding-left: 0.6rem;
    font-weight: 500;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CustomContentBody = styled(ContentBody)`
  background-color: ${({ theme }) => theme.colors.dark700};
  padding: 1rem 2rem;
`;

const CommentDate = styled.time`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.grey600};
  font-style: italic;
`;

const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <StyledComment key={comment.id}>
      <CustomContentHeader>
        <Avatar>
          <img
            src={
              comment.user.avatar
                ? `${process.env.SERVER_URL}${comment.user.avatar.url}`
                : "/img/avatar-placeholder.jpg"
            }
            alt={`Zdjęcie profilowe użytkownika ${comment.user.username}`}
          />
          <figcaption>
            <Link
              href="/uzytkownik/[user_id]"
              as={`/uzytkownik/${comment.user.id}`}
            >
              <a>
                <div className="user-name">{comment.user.username}</div>
              </a>
            </Link>
            <div className="user-rank">{getRankName(comment.user.rank)}</div>
          </figcaption>
        </Avatar>
        <CommentDate dateTime={comment.createdAt}>
          {formatDate(new Date(comment.createdAt), { getExactTime: true })}
        </CommentDate>
      </CustomContentHeader>
      <CustomContentBody className="py-5">{comment.content}</CustomContentBody>
    </StyledComment>
  );
};

export default Comment;
