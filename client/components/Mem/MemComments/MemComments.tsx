import React, { useState, useContext } from "react";
import {
  Button,
  StyledTextArea,
} from "../../../utils/styled/components/components";
import { CommentType } from "../../../utils/types";
import { AuthContext } from "../../../context/authContext";
import Comment from "../Comment/Comment";
import { useMutation } from "@apollo/react-hooks";
import {
  addCommentMutation,
  getMemDetailsQuery,
} from "../../../queries/memQueries";
import Alert from "../../Alert";
import LoginOrRegister from "../../User/LoginOrRegister";
import {
  CommentsSection,
  CommentsSectionTitle,
  StyledContentBody,
} from "./styled";

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
          <LoginOrRegister className="mb-5" customText="dodać komentarz" />
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
