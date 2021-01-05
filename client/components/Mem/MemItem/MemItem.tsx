import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import {
  deleteMemMutation,
  updateMemMutation,
} from "../../../queries/memQueries";
import { getRankName, isPageAdmin } from "../../../utils/helpers";
import {
  Avatar,
  MemItemBody,
  MemItemFooter,
  MemItemHeader,
  StyledDropdown,
  StyledMemItem,
} from "../../../utils/styled/components/MemItem";
import { mediaCheckTypes, MemType } from "../../../utils/types";
import Modal from "../../Modal";
import MemActions from "../MemActions/MemActions";
import { StyledMemFigure } from "./styled";

interface Props {
  mem: MemType;
  memForCheck?: mediaCheckTypes;
  updateMemList?: (prev) => void;
  updateMemQuery?: (
    mapFn: (previousQueryResult: any, options: any) => any
  ) => void;
  router: SingletonRouter;
}

const MemItem: React.FC<Props> = ({
  mem,
  memForCheck = mediaCheckTypes.NO_CHECK,
  updateMemList,
  updateMemQuery,
  router,
}) => {
  const {
    ctx: { user, isAuth },
  } = useContext(AuthContext);

  const [loading, setLoading] = useState({
    deleteMem: false,
    reportMem: false,
  });
  const [modals, setModals] = useState({
    deleteModal: false,
    reportModal: false,
  });

  const optionsDropdownTriggerEl = useRef<HTMLDivElement>(null);
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [deleteMem] = useMutation(deleteMemMutation);
  const [updateMem] = useMutation(updateMemMutation);

  useEffect(() => {
    const checkIfEnterPressed = (e: KeyboardEvent) => {
      if (e.key === "Enter") setIsOptionsActive(true);
    };

    optionsDropdownTriggerEl.current.addEventListener(
      "keypress",
      checkIfEnterPressed
    );

    return () =>
      optionsDropdownTriggerEl.current.removeEventListener(
        "keypress",
        checkIfEnterPressed
      );
  }, []);

  const handleDeleteMem = async () => {
    try {
      setLoading({ ...loading, deleteMem: true });
      await deleteMem({ variables: { id: mem.id } });
      setLoading({ ...loading, deleteMem: false });
      setModals({ ...modals, deleteModal: false });

      if (router.pathname !== "/") {
        router.push("/");
      }

      if (updateMemList) {
        updateMemList((prev) => {
          return {
            ...prev,
            mems: prev.mems.filter(({ id }) => id !== mem.id),
          };
        });
      }
    } catch (e) {
      console.log("Wystąpił błąd podczas usuwania mema");
      setModals({ ...modals, deleteModal: false });
    }
  };

  const handleReportMem = async () => {
    setLoading({ ...loading, reportMem: true });
    try {
      await updateMem({
        variables: {
          input: { where: { id: mem.id }, data: { isReported: true } },
        },
      });
      setModals({ ...modals, reportModal: false });
    } catch {
      console.log("Wystąpił błąd podczas zgłaszania mema");
    } finally {
      setLoading({ ...loading, reportMem: false });
    }
  };

  return (
    <StyledMemItem>
      <Modal
        isOpen={modals.deleteModal}
        actionClose={() => setModals({ ...modals, deleteModal: false })}
        actionSubmit={handleDeleteMem}
        actionProgress={loading.deleteMem}
        body={
          <p className="has-text-danger">
            Czy chcesz usunąć tego mema? Nie będziesz mógł go przywrócić
          </p>
        }
      />
      <Modal
        isOpen={modals.reportModal}
        actionClose={() => setModals({ ...modals, reportModal: false })}
        actionSubmit={handleReportMem}
        actionProgress={loading.reportMem}
        title="Zgłoszenie zdjęcia"
        body={
          <>
            <p>
              Czy uważasz, że ta grafika narusza zasady udostępniania treści w
              internecie?
            </p>
            <p className="has-text-danger mt-3">
              Bezpodstawne zgłaszanie może zakończyć się blokadą konta!
            </p>
          </>
        }
      />
      <MemItemHeader>
        <div className="content-wrapper">
          <Avatar>
            <Link
              href="/uzytkownik/[user_id]"
              as={`/uzytkownik/${mem.user.id}`}
            >
              <a>
                <img
                  src={
                    mem.user.avatar
                      ? `${process.env.SERVER_URL}${mem.user.avatar.url}`
                      : "/img/avatar-placeholder.jpg"
                  }
                  alt={`Zdjęcie profilowe użytkownika ${mem.user.username}`}
                />
              </a>
            </Link>
            <figcaption>
              <Link
                href="/uzytkownik/[user_id]"
                as={`/uzytkownik/${mem.user.id}`}
              >
                <a>
                  <div className="user-name">{mem.user.username}</div>
                </a>
              </Link>
              <div className="user-rank">{getRankName(mem.user.rank)}</div>
            </figcaption>
          </Avatar>
          <div
            className="options"
            aria-label="Opcje"
            tabIndex={0}
            role="button"
            ref={optionsDropdownTriggerEl}
            onClick={() => {
              setIsOptionsActive(true);
            }}
            onMouseLeave={() => {
              setIsOptionsActive(false);
            }}
          >
            <div className={`dropdown ${isOptionsActive ? "is-active" : ""}`}>
              <div className="dropdown-trigger">
                <i
                  aria-hidden="true"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  className={`button fas fa-ellipsis-h ${
                    isOptionsActive ? "active" : ""
                  }`}
                ></i>
              </div>
              <StyledDropdown
                className="dropdown-menu"
                id="dropdown-menu"
                role="menu"
              >
                <div className="dropdown-content">
                  <Link
                    href="/uzytkownik/[user_id]"
                    as={`/uzytkownik/${mem.user.id}`}
                  >
                    <a href="#" className="dropdown-item">
                      Zobacz profil
                    </a>
                  </Link>
                  {mem.isReported === null && (
                    <>
                      <hr className="dropdown-divider" />
                      <button
                        onClick={() =>
                          setModals({ ...modals, reportModal: true })
                        }
                        className="button-link dropdown-item has-text-danger"
                      >
                        Zgłoś grafikę
                      </button>
                    </>
                  )}
                  {isAuth &&
                    (isPageAdmin(user.role) || mem.user.id === user.id) && (
                      <>
                        <hr className="dropdown-divider" />
                        <button
                          type="button"
                          onClick={() =>
                            setModals({ ...modals, deleteModal: true })
                          }
                          className={`button button-link dropdown-item has-text-danger ${
                            loading.deleteMem ? "is-loading" : ""
                          }`}
                        >
                          Usuń
                        </button>
                      </>
                    )}
                </div>
              </StyledDropdown>
            </div>
          </div>
        </div>
      </MemItemHeader>
      <MemItemBody>
        <div className="content-wrapper">
          <StyledMemFigure>
            <figcaption>
              {router.pathname !== "/mem/[mem_id]" ? (
                <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`}>
                  <a>
                    <h3 className="mem-title">{mem.title}</h3>
                  </a>
                </Link>
              ) : (
                <h3 className="mem-title">{mem.title}</h3>
              )}
              <ul className="mem-categories mb-3">
                {mem.categories.map(({ name, id }) => (
                  <li key={id}>
                    <Link
                      href={{
                        pathname: "/",
                        query: { category: name },
                      }}
                    >
                      <a className="is-link has-text-primary">#{name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </figcaption>
            {router.pathname !== "/mem/[mem_id]" ? (
              <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`}>
                <a>
                  <img
                    className="is-fullwidth"
                    src={`${process.env.SERVER_URL}${mem.image.url}`}
                    alt={mem.title}
                    width={mem.image.width}
                    height={mem.image.height}
                  />
                </a>
              </Link>
            ) : (
              <img
                className="is-fullwidth"
                src={`${process.env.SERVER_URL}${mem.image.url}`}
                alt={mem.title}
              />
            )}
          </StyledMemFigure>
        </div>
      </MemItemBody>
      <MemItemFooter>
        <div className="content-wrapper">
          <MemActions
            likes={mem.likes}
            dislikes={mem.dislikes}
            memCheckActions={memForCheck}
            updateMemList={updateMemList}
            updateMemQuery={updateMemQuery}
            mem={mem}
          />
        </div>
      </MemItemFooter>
    </StyledMemItem>
  );
};

export default withRouter(MemItem);
