import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  Button,
  ContentBody,
  StyledTextArea,
} from "../../utils/styled/components/components";
import { CommentType } from "../../utils/types";
import { AuthContext } from "../../context/authContext";
import Comment from "./Comment";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import {
  addCommentMutation,
  getMemDetailsQuery,
} from "../../queries/memQueries";
import Alert from "../Alert";

const CommentsSection = styled.section.attrs({ className: "section" })`
  background: ${({ theme }) => theme.colors.dark600};
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

const StyledContentBody = styled(ContentBody)`
  background: ${({ theme }) => theme.colors.dark800};
`;

interface Props {
  comments: Array<CommentType>;
  memId: string;
}

const MemComments: React.FC<Props> = ({ comments, memId }) => {
  const {
    ctx: { user },
  } = useContext(AuthContext);

  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [comment, setComment] = useState("");
  const [addComment] = useMutation(addCommentMutation);

  const handleSubmitNewComment = async (e) => {
    e.preventDefault();
    if (!comment) return;
    try {
      await addComment({
        variables: { userId: user.id, content: comment, memId },
        refetchQueries: [
          { query: getMemDetailsQuery, variables: { id: memId } },
        ],
      });
      setComment("");
    } catch (err) {
      setAlert({
        type: "danger",
        msg: "Wystąpił błąd podczas dodawania komentarza",
      });
    }
  };

  const handleCommentChange = ({ target: { value } }) => setComment(value);

  return (
    <CommentsSection>
      {user ? (
        <>
          <CommentsSectionTitle>Co o tym sądzisz?</CommentsSectionTitle>
          <Alert
            alert={alert}
            clearAlert={() => setAlert({ msg: "", type: "" })}
          />
          <form action="submit" onSubmit={handleSubmitNewComment}>
            <div className="field">
              <div className="control">
                <StyledTextArea
                  value={comment}
                  onChange={handleCommentChange}
                  className="textarea mb-5"
                  placeholder="Napisz kilka słów, zachowując kulturę wypowiedzi i takie tam..."
                ></StyledTextArea>
              </div>
            </div>
            {comment && (
              <Button
                className="is-primary light mb-5 px-5 is-small"
                type="submit"
              >
                Dodaj komentarz
              </Button>
            )}
          </form>
        </>
      ) : (
        <>
          <CommentsSectionTitle>Co o tym sądzisz?</CommentsSectionTitle>
          <StyledContentBody className="mb-5">
            <Link href="/logowanie">
              <a className="is-link">Zaloguj się</a>
            </Link>{" "}
            lub{" "}
            <Link href="/rejestracja">
              <a className="is-link">zarejestruj</a>
            </Link>
            , aby dodać komentarz
          </StyledContentBody>
        </>
      )}
      <CommentsSectionTitle>Komentarze</CommentsSectionTitle>
      {comments.length ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <StyledContentBody>Brak komentarzy</StyledContentBody>
      )}
    </CommentsSection>
  );
};

export default MemComments;
