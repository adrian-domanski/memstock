import React, { useState } from "react";
import MemActions from "./MemActions";
import {
  StyledMemItem,
  MemItemHeader,
  StyledDropdown,
  MemItemBody,
  MemItemFooter,
} from "../../utils/styled/components/MemItem";
import Link from "next/link";

interface Props {
  mem: any;
}

const MemItem: React.FC<Props> = ({ mem }) => {
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  return (
    <StyledMemItem>
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
                  <a href="#" className="dropdown-item">
                    With a divider
                  </a>
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
          <MemActions likes={mem.likes} dislikes={mem.dislikes} />
        </div>
      </MemItemFooter>
    </StyledMemItem>
  );
};

export default MemItem;
