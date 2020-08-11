import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import styled from "styled-components";
import { deleteMemMutation, updateMemMutation } from "../../queries/memQueries";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikeButton = styled.button<{ memCheckActions?: boolean }>`
  &&& {
    grid-area: like;
    font-weight: 400;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white500};
    background: #24964c;
    height: 100%;
    width: ${({ memCheckActions }) => (memCheckActions ? "unset" : "40px")};
    display: block;
    padding: ${({ memCheckActions }) =>
      memCheckActions ? "0.5rem 2rem" : "0"};
    border: 0;
    transition: background-color 0.2s ease;

    :hover {
      background-color: #2d864c;
    }

    :active {
      background-color: #18793a;
    }

    :focus {
      box-shadow: none;
    }
  }
`;

const DislikeButton = styled.button<{ memCheckActions?: boolean }>`
  &&& {
    grid-area: dislike;
    background: ${({ theme }) => theme.colors.danger};
    font-weight: 400;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white500};
    height: 100%;
    width: ${({ memCheckActions }) => (memCheckActions ? "unset" : "40px")};
    display: block;
    padding: ${({ memCheckActions }) =>
      memCheckActions ? "0.5rem 2rem" : "0"};
    border: 0;
    transition: background-color 0.2s ease;

    :hover {
      background-color: #c72e4c;
    }

    :active {
      background-color: #903245;
    }

    :focus {
      box-shadow: none;
    }
  }
`;

const MemButtons = styled.div<{ memCheckActions?: boolean }>`
  &&& {
    display: ${({ memCheckActions }) => (memCheckActions ? "flex" : "grid")};
    ${({ memCheckActions }) =>
      memCheckActions && "justify-content: space-between; width:100%;"};
    grid-template-areas: "like counter dislike";
    grid-template-columns: 40px 80px 40px;
    grid-template-rows: 40px;
    gap: 8px;

    .counter {
      grid-area: counter;
      background: #484848;

      .likes {
        color: ${({ theme }) => theme.colors.success};
      }

      .dislikes {
        color: ${({ theme }) => theme.colors.danger};
      }

      .divider {
        margin: 0 5px;
      }
    }

    .like,
    .dislike,
    .counter {
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  i {
    margin-right: 5px;
  }
`;

interface Props {
  likes: number;
  dislikes: number;
  memCheckActions: boolean;
  memId: string;
  updateMemList: <
    TVars = {
      limit: number;
      start: number;
      where: object;
    }
  >(
    mapFn: (previousQueryResult: any, options: Pick<any, "variables">) => any
  ) => void;
}

const MemActions: React.FC<Props> = ({
  likes,
  dislikes,
  memCheckActions = false,
  memId,
  updateMemList,
}) => {
  const [loading, setLoading] = useState({
    publicMem: false,
    deleteMem: false,
  });
  const [updateMem] = useMutation(updateMemMutation);
  const [deleteMem] = useMutation(deleteMemMutation);

  const handlePublicMem = async () => {
    setLoading({ ...loading, publicMem: true });
    await updateMem({
      variables: { input: { where: { id: memId }, data: { isPublic: true } } },
    });

    updateMemList((prev) => {
      return {
        ...prev,
        mems: prev.mems.filter((mem) => mem.id !== memId),
      };
    });
    setLoading({ ...loading, publicMem: false });
  };

  const handleDeleteMem = async () => {
    setLoading({ ...loading, deleteMem: true });
    await deleteMem({ variables: { id: memId } });
    updateMemList((prev) => {
      return {
        ...prev,
        mems: prev.mems.filter((mem) => mem.id !== memId),
      };
    });
    setLoading({ ...loading, deleteMem: false });
  };

  const handleMemAction = async (type: "LIKE" | "DISLIKE") => {
    const userVotes = localStorage.getItem("votes")
      ? JSON.parse(localStorage.getItem("votes"))
      : [];

    const actionsOnThisMedia = userVotes.filter(
      (vote) => vote.mediaId === memId
    );

    let updateData = {};

    if (type === "LIKE" && !actionsOnThisMedia.length) {
      updateData = { likes: likes + 1 };
    } else if (type === "DISLIKE" && !actionsOnThisMedia.length) {
      updateData = { dislikes: dislikes + 1 };
    } else if (actionsOnThisMedia.length) {
      const [action] = actionsOnThisMedia;
      if (action.type === "LIKE" && type === "DISLIKE") {
        updateData = { likes: likes - 1, dislikes: dislikes + 1 };
      } else if (action.type === "DISLIKE" && type === "LIKE") {
        updateData = { likes: likes + 1, dislikes: dislikes - 1 };
      } else if (action.type === type) return;
    }

    localStorage.setItem(
      "votes",
      JSON.stringify([
        ...userVotes.filter((votes) => votes.mediaId !== memId),
        { mediaId: memId, type },
      ])
    );

    try {
      const data = await updateMem({
        variables: { input: { where: { id: memId }, data: updateData } },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlexWrapper>
      {!memCheckActions ? (
        <>
          <MemButtons>
            <LikeButton
              className="button like"
              onClick={() => handleMemAction("LIKE")}
            >
              <i className="fas fa-thumbs-up"></i>
            </LikeButton>
            <DislikeButton
              className="button dislike"
              onClick={() => handleMemAction("DISLIKE")}
            >
              <i className="fas fa-thumbs-down"></i>
            </DislikeButton>
            <div className="counter">
              <span className="likes">{likes}</span>
              <span className="divider">/</span>
              <span className="dislikes">{dislikes}</span>
            </div>
          </MemButtons>
          <ShareButton className="button is-link">
            <i className="fab fa-facebook-square"></i>Udostępnij
          </ShareButton>
        </>
      ) : (
        <MemButtons memCheckActions>
          <DislikeButton
            memCheckActions
            onClick={handleDeleteMem}
            className={`button dislike ${
              loading.deleteMem ? "is-loading" : ""
            }`}
          >
            Usuń
          </DislikeButton>
          <LikeButton
            memCheckActions
            onClick={handlePublicMem}
            type="button"
            className={`button like ${loading.publicMem ? "is-loading" : ""}`}
          >
            Akceptuj
          </LikeButton>
        </MemButtons>
      )}
    </FlexWrapper>
  );
};

export default MemActions;
