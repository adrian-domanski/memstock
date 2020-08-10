import React from "react";
import styled from "styled-components";
import {
  Button,
  ContentBody,
  ContentHeader,
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

const CommentsSectionTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white500};
  font-size: 1.5rem;
  position: relative;
  padding-left: 15px;
  margin-bottom: 1.8rem;

  :before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledTextArea = styled.textarea`
  background: ${({ theme }) => theme.colors.dark800};
  border-color: ${({ theme }) => theme.colors.dark800};
  color: ${({ theme }) => theme.colors.white500};

  ::placeholder {
    color: ${({ theme }) => theme.colors.grey700};
  }
`;

const StyledContentBody = styled(ContentBody)`
  background: ${({ theme }) => theme.colors.dark800};
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
      <CommentsSectionTitle>Co o tym sądzisz?</CommentsSectionTitle>
      <div className="field">
        <div className="control">
          <StyledTextArea
            className="textarea mb-3"
            placeholder="Napisz kilka słów, zachowując kulturę wypowiedzi i takie tam..."
          ></StyledTextArea>
        </div>
      </div>
      <Button className="is-primary light mb-5 px-5 is-small">
        Dodaj komentarz
      </Button>
      <CommentsSectionTitle>Komentarze</CommentsSectionTitle>
      {comments.length ? (
        comments.map((comment) => (
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
            <CustomContentBody className="py-5">
              {comment.content}
            </CustomContentBody>
          </article>
        ))
      ) : (
        <StyledContentBody>Brak komentarzy</StyledContentBody>
      )}
    </CommentsSection>
  );
};

export default MemComments;
