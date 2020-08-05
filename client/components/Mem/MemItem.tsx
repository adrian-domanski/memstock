import React, { useState, useContext } from "react";
import MemActions from "./MemActions";
import {
  StyledMemItem,
  MemItemHeader,
  StyledDropdown,
  MemItemBody,
  MemItemFooter,
} from "../../utils/styled/components/MemItem";
import Link from "next/link";
import { WatchQueryOptions, useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context/authContext";
import { isPageAdmin } from "../../utils/helpers";
import { deleteMemMutation } from "../../queries/memQueries";
import Modal from "../Modal";

interface Props {
  mem: any;
  memForCheck?: boolean;
  updateMemList?: <
    TVars = {
      limit: number;
      start: number;
      where: object;
    }
  >(
    mapFn: (
      previousQueryResult: any,
      options: Pick<WatchQueryOptions<TVars>, "variables">
    ) => any
  ) => void;
}

const MemItem: React.FC<Props> = ({
  mem,
  memForCheck = false,
  updateMemList,
}) => {
  const {
    ctx: { user, isAuth },
  } = useContext(AuthContext);

  const [loading, setLoading] = useState({ deleteMem: false });
  const [modals, setModals] = useState({ deleteModal: false });
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [deleteMem] = useMutation(deleteMemMutation);

  const handleDeleteMem = async () => {
    try {
      setLoading({ ...loading, deleteMem: true });
      await deleteMem({ variables: { id: mem.id } });
      updateMemList((prev) => {
        return {
          ...prev,
          mems: prev.mems.filter(({ id }) => id !== mem.id),
        };
      });
      setLoading({ ...loading, deleteMem: false });
    } catch {
      console.log("Wystąpił błąd podczas usuwania mema");
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
      <MemItemHeader>
        <div className="content-wrapper">
          <figure className="avatar">
            <img
              src="/img/avatar-placeholder.jpg"
              alt="Domyślne zdjęcie użytkownika, który nie ustawił swojego zdjęcia."
            />
            <figcaption>
              <div className="user-name">{mem.user.username}</div>
              <div className="user-rank">{mem.user.rank}</div>
            </figcaption>
          </figure>
          <div
            className="options"
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
                  <a href="#" className="dropdown-item">
                    Dropdown item
                  </a>
                  <a className="dropdown-item">Other dropdown item</a>
                  <a href="#" className="dropdown-item">
                    Active dropdown item
                  </a>
                  <a href="#" className="dropdown-item">
                    Other dropdown item
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item has-text-danger">
                    Zgłoś grafikę
                  </a>
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
          <figure>
            <figcaption>
              <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`}>
                <a>
                  <h3 className="mem-title">{mem.title}</h3>
                </a>
              </Link>
              <ul className="mem-categories mb-3">
                {mem.categories.map(({ name, id }) => (
                  <li key={id}>#{name}</li>
                ))}
              </ul>
            </figcaption>
            <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`}>
              <a>
                <img
                  className="is-fullwidth"
                  src={`${process.env.SERVER_URL}${mem.image.url}`}
                  alt={mem.title}
                />
              </a>
            </Link>
          </figure>
        </div>
      </MemItemBody>
      <MemItemFooter>
        <div className="content-wrapper">
          <MemActions
            likes={mem.likes}
            dislikes={mem.dislikes}
            memCheckActions={memForCheck}
            updateMemList={updateMemList}
            memId={mem.id}
          />
        </div>
      </MemItemFooter>
    </StyledMemItem>
  );
};

export default MemItem;
