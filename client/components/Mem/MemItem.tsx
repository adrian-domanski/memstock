import React, { useState } from "react";
import styled from "styled-components";
import MemActions from "./MemActions";

const StyledMemItem = styled.article`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }

  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const MemItemHeader = styled.header`
  background: ${({ theme }) => theme.colors.dark700};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .options {
    cursor: pointer;

    :hover i {
      color: ${({ theme }) => theme.colors.primaryDarker};
    }

    i {
      transition: color 0.2s ease-in-out;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.5rem;
      width: 50px;
      height: 50px;
      background: unset;
      border: none;

      &.active {
        background: ${({ theme }) => theme.colors.dark800};
      }
    }
  }

  .avatar {
    display: flex;
    img {
      border-radius: 50%;
      width: 50px;
    }
    figcaption {
      padding-left: 0.8rem;

      .user-name {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.1rem;
      }

      .user-rank {
        color: ${({ theme }) => theme.colors.accent};
        font-size: 0.9rem;
      }
    }
  }
`;

const MemItemBody = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.dark600};

  .mem-title {
    color: ${({ theme }) => theme.colors.white500};
    font-size: 2rem;
  }

  .mem-categories {
    display: flex;

    li {
      color: ${({ theme }) => theme.colors.primary};

      :not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;

const MemItemFooter = styled.footer`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.dark700};
`;

const StyledDropdown = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow};
  .dropdown-content {
    background-color: ${({ theme }) => theme.colors.dark700};
  }

  .dropdown-item {
    color: ${({ theme }) => theme.colors.white500};

    :hover {
      background-color: ${({ theme }) => theme.colors.dark800};
      color: ${({ theme }) => theme.colors.white500};
    }
  }

  .dropdown-divider {
    background-color: ${({ theme }) => theme.colors.dark800};
  }
`;

const MemItem: React.FC = () => {
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  return (
    <StyledMemItem>
      <MemItemHeader>
        <figure className="avatar">
          <img
            src="/img/avatar-placeholder.jpg"
            alt="Domyślne zdjęcie użytkownika, który nie ustawił swojego zdjęcia."
          />
          <figcaption>
            <div className="user-name">Onyx321</div>
            <div className="user-rank">Fanatyk wędkarstwa</div>
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
      </MemItemHeader>
      <MemItemBody>
        <div className="section py-3">
          <figure>
            <figcaption>
              <h3 className="mem-title">Mem title</h3>
              <ul className="mem-categories mb-3">
                <li>#beka</li>
                <li>#hehe</li>
                <li>#śmieszne</li>
              </ul>
            </figcaption>
            <img src="https://picsum.photos/1000/600" alt="random img" />
          </figure>
        </div>
      </MemItemBody>
      <MemItemFooter>
        <div className="section py-0">
          <MemActions />
        </div>
      </MemItemFooter>
    </StyledMemItem>
  );
};

export default MemItem;
