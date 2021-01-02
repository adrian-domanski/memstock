import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { Vote } from "../../../context/reducers/authReducer";
import {
  deleteMemMutation,
  updateMemMutation,
} from "../../../queries/memQueries";
import { updateUserMutation } from "../../../queries/userQueries";
import { mediaCheckTypes, MemType } from "../../../utils/types";
import ShareButton from "../ShareButton";
import { DislikeButton, FlexWrapper, LikeButton, MemButtons } from "./styled";

interface Props {
  likes: number;
  dislikes: number;
  memCheckActions: mediaCheckTypes;
  mem: MemType;
  updateMemList?: (
    mapFn: (previousQueryResult: any, options: Pick<any, "variables">) => any
  ) => void;
  updateMemQuery?: (
    mapFn: (previousQueryResult: any, options: any) => any
  ) => void;
}

const MemActions: React.FC<Props> = ({
  likes,
  dislikes,
  memCheckActions = mediaCheckTypes.NO_CHECK,
  mem,
  updateMemList,
  updateMemQuery,
}) => {
  const {
    ctx: { votes },
    dispatch,
  } = useContext(AuthContext);

  const [loading, setLoading] = useState({
    publicMem: false,
    deleteMem: false,
    unReportMem: false,
  });

  const [userAction, setUserAction] = useState<Vote>();
  const [updateMem] = useMutation(updateMemMutation);
  const [deleteMem] = useMutation(deleteMemMutation);
  const [updateUser] = useMutation(updateUserMutation);

  useEffect(() => {
    const [actionOnThisMedia] = votes.filter((vote) => vote.mediaId === mem.id);
    if (actionOnThisMedia) {
      setUserAction(actionOnThisMedia);
    } else setUserAction(null);
  }, [votes]);

  const handleRejectReport = async () => {
    setLoading({ ...loading, unReportMem: true });
    await updateMem({
      variables: {
        input: { where: { id: mem.id }, data: { isReported: false } },
      },
    });

    updateMemList((prev) => {
      return {
        ...prev,
        mems: prev.mems.filter(({ id }) => id !== mem.id),
      };
    });
    setLoading({ ...loading, unReportMem: false });
  };

  const handlePublicMem = async () => {
    setLoading({ ...loading, publicMem: true });
    await updateMem({
      variables: { input: { where: { id: mem.id }, data: { isPublic: true } } },
    });

    updateMemList((prev) => {
      return {
        ...prev,
        mems: prev.mems.filter(({ id }) => id !== mem.id),
      };
    });
    setLoading({ ...loading, publicMem: false });
  };

  const handleDeleteMem = async () => {
    setLoading({ ...loading, deleteMem: true });
    await deleteMem({ variables: { id: mem.id } });
    updateMemList((prev) => {
      return {
        ...prev,
        mems: prev.mems.filter(({ id }) => id !== mem.id),
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

    dispatch({ type: "USER_NEW_VOTE", payload: { mediaId: mem.id, type } });

    try {
      await updateMem({
        variables: { input: { where: { id: mem.id }, data: updateData } },
      });

      // Update UI (MemAction from mem list - updateMemList or from [mem_id] - updateMemQuery)
      if (updateMemList) {
        updateMemList((prev) => ({
          ...prev,
          mems: prev.mems.map((currMem: MemType) => {
            if (currMem.id === mem.id)
              return {
                ...currMem,
                likes: updateData.likes,
                dislikes: updateData.dislikes,
              };
            else return currMem;
          }),
        }));
      } else if (updateMemQuery) {
        updateMemQuery((prev) => ({
          ...prev,
          mem: {
            ...prev.mem,
            likes: updateData.likes,
            dislikes: updateData.dislikes,
          },
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlexWrapper>
      {memCheckActions === mediaCheckTypes.FOR_PUBLICATION ? (
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
      ) : memCheckActions === mediaCheckTypes.FOR_REPORT ? (
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
            onClick={handleRejectReport}
            type="button"
            className={`button like ${loading.publicMem ? "is-loading" : ""}`}
          >
            Fałszywe zgłoszenie
          </LikeButton>
        </MemButtons>
      ) : (
        <>
          <MemButtons>
            <LikeButton
              className={`button like ${
                userAction &&
                userAction.mediaId === mem.id &&
                userAction.type === "LIKE"
                  ? "is-active"
                  : ""
              }`}
              aria-label="Lubię to"
              onClick={() => handleMemAction("LIKE")}
            >
              <i aria-hidden="true" className="fas fa-thumbs-up"></i>
            </LikeButton>
            <DislikeButton
              className={`button dislike ${
                userAction &&
                userAction.mediaId === mem.id &&
                userAction.type === "DISLIKE"
                  ? "is-active"
                  : ""
              }`}
              aria-label="Nie lubie tego"
              onClick={() => handleMemAction("DISLIKE")}
            >
              <i aria-hidden="true" className="fas fa-thumbs-down"></i>
            </DislikeButton>
            <div className="counter">
              <span className="dislikes">{dislikes}</span>
              <span className="divider">/</span>
              <span className="likes">{likes}</span>
            </div>
          </MemButtons>
          <ShareButton memId={mem.id} />
        </>
      )}
    </FlexWrapper>
  );
};

export default MemActions;
