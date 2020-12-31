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
import {
  checkCommentCooldown,
  setCommentCooldown,
} from "../../../utils/helpers";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../Loader";

interface Props {
  comments: Array<CommentType>;
  fetchMoreComments: () => Promise<void>;
  hasMore: boolean;
  memId: string;
}

const MemComments: React.FC<Props> = ({
  fetchMoreComments,
  hasMore,
  comments,
  memId,
}) => {
  const {
    ctx: { user },
  } = useContext(AuthContext);

  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [comment, setComment] = useState("");
  const [addComment] = useMutation(addCommentMutation);

  const handleSubmitNewComment = async (e) => {
    e.preventDefault();

    if (!comment) return;

    if (checkCommentCooldown()) {
      return setAlert({
        type: "danger",
        msg: "Możesz napisać kolejny komentarz za 5 sekund!",
      });
    }

    if (comment.length > 1500) {
      return setAlert({
        type: "danger",
        msg: "Komentarz nie może być dłuższy niż 1500 znaków.",
      });
    }

    try {
      await addComment({
        variables: { userId: user.id, content: comment, memId },
        refetchQueries: [
          { query: getMemDetailsQuery, variables: { id: memId } },
        ],
      });
      setComment("");
      setAlert({ msg: "", type: "" });

      setCommentCooldown();
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
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={fetchMoreComments}
          loader={<Loader key={0} />}
        >
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </InfiniteScroll>
      ) : (
        <StyledContentBody className="py-5">Brak komentarzy</StyledContentBody>
      )}
    </CommentsSection>
  );
};

export default MemComments;
