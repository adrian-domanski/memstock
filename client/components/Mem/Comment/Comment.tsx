import React, { useContext, useState } from "react";
import { CommentType } from "../../../utils/types";
import { getRankName, formatDate } from "../../../utils/helpers";
import { Avatar } from "../../../utils/styled/components/MemItem";
import Link from "next/link";
import {
  CommentInfo,
  CustomContentBody,
  CustomContentHeader,
  StyledComment,
  UnstyledDeleteCommentButton,
} from "./styled";
import { AuthContext } from "../../../context/authContext";
import Modal from "../../Modal";
import { useMutation } from "@apollo/react-hooks";
import { deleteCommentMutation } from "../../../queries/memQueries";

interface Props {
  comment: CommentType;
  updateMemQuery?: (
    mapFn: (previousQueryResult: any, options: any) => any
  ) => void;
}

const Comment: React.FC<Props> = ({ comment, updateMemQuery }) => {
  const {
    ctx: { user },
  } = useContext(AuthContext);

  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = useState(
    false
  );
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);

  const [deleteComment] = useMutation(deleteCommentMutation);

  const handleDeleteComment = async () => {
    setDeleteCommentLoading(true);
    try {
      // Delete from db
      await deleteComment({
        variables: {
          id: comment.id,
        },
      });

      // Delete from ui
      updateMemQuery((prev) => ({
        ...prev,
        mem: {
          ...prev.mem,
          comments: prev.mem.comments.filter((comm) => comm.id !== comment.id),
        },
      }));

      setIsDeleteCommentModalOpen(false);

      if (alert.msg) setAlert({ msg: "", type: "" });
    } catch (e) {
      setAlert({
        msg: "Wystąpił bład podczas usuwania tego komentarza",
        type: "danger",
      });
    } finally {
      setDeleteCommentLoading(false);
    }
  };

  return (
    <>
      <Modal
        actionClose={() => setIsDeleteCommentModalOpen(false)}
        actionProgress={deleteCommentLoading}
        actionSubmit={handleDeleteComment}
        isOpen={isDeleteCommentModalOpen}
        title="Czy chcesz usunąć ten komentarz?"
        alert={alert}
        clearAlert={() => setAlert({ msg: "", type: "" })}
        body={
          <p className="has-text-danger">
            Nie będziesz mógł później cofnąć tej akcji!
          </p>
        }
      />
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
          <CommentInfo dateTime={comment.createdAt}>
            <span>
              {formatDate(new Date(comment.createdAt), { getExactTime: true })}
            </span>
            {comment.user.id === user?.id && (
              <UnstyledDeleteCommentButton
                onClick={() => setIsDeleteCommentModalOpen(true)}
              >
                <i className="fas fa-trash-alt has-text-danger"></i>
              </UnstyledDeleteCommentButton>
            )}
          </CommentInfo>
        </CustomContentHeader>
        <CustomContentBody className="py-5">
          {comment.content}
        </CustomContentBody>
      </StyledComment>
    </>
  );
};

export default Comment;
