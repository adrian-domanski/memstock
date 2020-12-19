import React from "react";
import { CommentType } from "../../../utils/types";
import { getRankName, formatDate } from "../../../utils/helpers";
import { Avatar } from "../../../utils/styled/components/MemItem";
import Link from "next/link";
import {
  CommentDate,
  CustomContentBody,
  CustomContentHeader,
  StyledComment,
} from "./styled";

interface Props {
  comment: CommentType;
}

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
