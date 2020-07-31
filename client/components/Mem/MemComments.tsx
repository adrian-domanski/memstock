import React from "react";
import styled from "styled-components";
import {
  ContentHeader,
  ContentBody,
} from "../../utils/styled/components/components";

const CommentsSection = styled.section.attrs({ className: "section" })`
  background: ${({ theme }) => theme.colors.dark600};
`;

const Avatar: React.FC<{ src: string; alt: string }> = styled.img`
  border-radius: 50%;
  width: 40px;
`;

const CustomContentHeader = styled(ContentHeader)`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.dark800};

  .username {
    padding-left: 0.8rem;
    font-weight: 500;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CustomContentBody = styled(ContentBody)`
  background-color: ${({ theme }) => theme.colors.dark700};
  padding: 1rem 2rem;
`;

interface Props {
  comments: Array<{
    id: string;
    content: string;
    user: {
      username: string;
      avatar: {
        url: string;
      } | null;
    };
  }>;
}

const MemComments: React.FC<Props> = ({ comments }) => {
  return (
    <CommentsSection>
      {comments.map((comment) => (
        <article key={comment.id}>
          <CustomContentHeader>
            <Avatar
              src={
                comment.user.avatar
                  ? `${process.env.SERVER_URL}${comment.user.avatar.url}`
                  : "/img/avatar-placeholder.jpg"
              }
              alt={`Zdjęcie użytkownika ${comment.user.username}`}
            ></Avatar>
            <span className="username">{comment.user.username}</span>
          </CustomContentHeader>
          <CustomContentBody>{comment.content}</CustomContentBody>
        </article>
      ))}
    </CommentsSection>
  );
};

export default MemComments;
