import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { Vote } from "../../context/reducers/authReducer";
import { deleteMemMutation, updateMemMutation } from "../../queries/memQueries";
import { Mem } from "../../utils/types";

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

    &.is-active i {
      color: #2a4433;
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

    &.is-active i {
      color: #46262c;
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
  updateMemList: (
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
  const {
    ctx: { votes },
    dispatch,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState({
    publicMem: false,
    deleteMem: false,
  });
  const [userAction, setUserAction] = useState<Vote>();
  const [updateMem] = useMutation(updateMemMutation);
  const [deleteMem] = useMutation(deleteMemMutation);

  useEffect(() => {
    const [actionOnThisMedia] = votes.filter((vote) => vote.mediaId === memId);

    if (actionOnThisMedia) {
      setUserAction(actionOnThisMedia);
    } else setUserAction(null);
  }, [votes]);

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
    let updateData: { likes: number; dislikes: number } = { likes, dislikes };

    if (type === "LIKE" && !userAction) {
      updateData = { likes: likes + 1, dislikes };
    } else if (type === "DISLIKE" && !userAction) {
      updateData = { dislikes: dislikes + 1, likes };
    } else if (userAction) {
      if (userAction.type === "LIKE" && type === "DISLIKE") {
        updateData = { likes: likes - 1, dislikes: dislikes + 1 };
      } else if (userAction.type === "DISLIKE" && type === "LIKE") {
        updateData = { likes: likes + 1, dislikes: dislikes - 1 };
      } else if (userAction.type === "DISLIKE" && type === "DISLIKE") {
        updateData = { likes, dislikes: dislikes - 1 };
      } else if (userAction.type === "LIKE" && type === "LIKE") {
        updateData = { likes: likes - 1, dislikes };
      }
    } else return;

    if (updateData.likes < 0 || updateData.dislikes < 0) return;

    dispatch({ type: "USER_NEW_VOTE", payload: { mediaId: memId, type } });

    console.log({ mediaId: memId, type });

    try {
      const data = await updateMem({
        variables: { input: { where: { id: memId }, data: updateData } },
      });

      updateMemList((prev) => {
        return {
          ...prev,
          mems: prev.mems.map((mem: Mem) => {
            if (mem.id === memId)
              return {
                ...mem,
                likes: updateData.likes,
                dislikes: updateData.dislikes,
              };
            else return mem;
          }),
        };
      });
      setLoading({ ...loading, deleteMem: false });

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
              className={`button like ${
                userAction &&
                userAction.mediaId === memId &&
                userAction.type === "LIKE"
                  ? "is-active"
                  : ""
              }`}
              onClick={() => handleMemAction("LIKE")}
            >
              <i className="fas fa-thumbs-up"></i>
            </LikeButton>
            <DislikeButton
              className={`button dislike ${
                userAction &&
                userAction.mediaId === memId &&
                userAction.type === "DISLIKE"
                  ? "is-active"
                  : ""
              }`}
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
