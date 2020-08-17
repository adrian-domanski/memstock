import { useQuery } from "@apollo/react-hooks";
import { SingletonRouter, withRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/Loader";
import MemList from "../../components/Mem/MemList";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";
import ChangeUserAvatar from "../../components/User/ChangeUserAvatar";
import { AuthContext } from "../../context/authContext";
import {
  countUsersQuery,
  getUserDetailsQuery,
} from "../../queries/userQueries";
import { formatDate, getRankName } from "../../utils/helpers";
import {
  ContentBody,
  ContentFooter,
  PageWrapper,
  StyledTabs,
} from "../../utils/styled/components/components";
import {
  MemItemHeader as UserInfo,
  StyledDropdown,
  Avatar,
} from "../../utils/styled/components/MemItem";

const UserContentHeader = styled(UserInfo).attrs({ as: "div" })`
  padding: 1.5rem 2rem;

  .content-wrapper {
    height: unset;
  }

  .avatar {
    .avatar-wrapper {
      width: 70px;
      height: 70px;
      position: relative;
      display: block;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;

      :after {
        content: "";
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
      }

      :before {
        font-family: "Font Awesome 5 Free";
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({ theme }) => theme.colors.accent};
        transform: translateY(10px);
        z-index: 2;
        font-size: 2rem;
        content: "\f085";
        transition: transform 0.3s ease;
      }

      :before,
      :after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scale(0);
      }

      :hover {
        :before,
        :after {
          transform: scale(1);
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    figcaption {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .user-name {
        font-size: 1.8rem;
      }

      .user-rank {
        font-size: 1.2rem;
      }
    }
  }
`;

interface Props {
  router: SingletonRouter;
}

const UserDetails: React.FC<Props> = ({ router }) => {
  const {
    ctx: { user },
  } = useContext(AuthContext);
  const userId = router.query.user_id;
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [isUpdateAvatarModalOpen, setIsUpdateAvatarModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "all" | "mems" | "films" | "favourite"
  >("mems");

  const { data: userData, loading: userLoading } = useQuery(
    getUserDetailsQuery,
    {
      variables: { id: userId },
    }
  );

  const { data: countUsersData, loading: countUsersLoading } = useQuery(
    countUsersQuery,
    {
      variables: { where: { rank_gt: !userLoading && userData.user.rank } },
      skip: userLoading,
    }
  );

  return (
    <Layout>
      <ChangeUserAvatar
        isOpen={isUpdateAvatarModalOpen}
        actionClose={() => setIsUpdateAvatarModalOpen(false)}
      />
      <PageWrapper>
        <div className="columns">
          <div className="column is-8-desktop">
            <div className="user-informations">
              <UserContentHeader>
                <div className="content-wrapper">
                  {!userLoading ? (
                    <>
                      <Avatar>
                        <img
                          src={
                            user.avatar
                              ? `${process.env.SERVER_URL}${user.avatar.url}`
                              : "/img/avatar-placeholder.jpg"
                          }
                          alt={`Zdjęcie profilowe użytkownika ${user.username}`}
                        />
                        <figcaption>
                          <div className="user-name">{user.username}</div>
                          <div className="user-rank">
                            {getRankName(user.rank)}
                          </div>
                        </figcaption>
                      </Avatar>
                      <div
                        className="options"
                        onClick={() => {
                          setIsOptionsActive(true);
                        }}
                        onMouseLeave={() => {
                          setIsOptionsActive(false);
                        }}
                      >
                        <div
                          className={`dropdown ${
                            isOptionsActive ? "is-active" : ""
                          }`}
                        >
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
                              {userId === user.id && (
                                <button
                                  onClick={() =>
                                    setIsUpdateAvatarModalOpen(true)
                                  }
                                  className="button button-link dropdown-item"
                                >
                                  Aktualizuj profil
                                </button>
                              )}

                              <a href="#" className="dropdown-item">
                                Other dropdown item
                              </a>
                              <hr className="dropdown-divider" />
                              <a
                                href="#"
                                className="dropdown-item has-text-danger"
                              >
                                Zgłoś grafikę
                              </a>
                            </div>
                          </StyledDropdown>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Loader />
                  )}
                </div>
              </UserContentHeader>
              <ContentBody>
                <ul>
                  <div className="content-wrapper">
                    {!userLoading && !countUsersLoading ? (
                      <>
                        <li>
                          <span className="has-text-primary">
                            Miejsce w rankingu:
                          </span>{" "}
                          {countUsersData.countUsers + 1}
                        </li>
                        <li>
                          <span className="has-text-primary">Punktów:</span>{" "}
                          {userData.user.rank}
                        </li>
                        <li>
                          <span className="has-text-primary">
                            Data dołączenia:
                          </span>{" "}
                          {formatDate(new Date(userData.user.createdAt))}
                        </li>
                      </>
                    ) : (
                      <Loader />
                    )}
                  </div>
                </ul>
              </ContentBody>
              <ContentFooter>
                <StyledTabs className="tabs is-accent">
                  <ul>
                    {/* <li
                      className={`${selectedTab === "all" ? "is-active" : ""}`}
                      onClick={() => setSelectedTab("all")}
                    >
                      <a>Wszystko</a>
                    </li> */}
                    <li
                      className={`${selectedTab === "mems" ? "is-active" : ""}`}
                      onClick={() => setSelectedTab("mems")}
                    >
                      <a>Memy</a>
                    </li>
                    {/* <li className={`${selectedTab === "films" ? "is-active" : ""}`} onClick={()=>setSelectedTab('films')}>
                    <a>Filmy</a>
                  </li> */}
                    <li
                      className={`${
                        selectedTab === "favourite" ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedTab("favourite")}
                    >
                      <a>Ulubione</a>
                    </li>
                  </ul>
                </StyledTabs>
              </ContentFooter>
            </div>
            <div className="user-content mt-5">
              <MemList where={{ user: { id: userId }, isPublic: true }} />
            </div>
          </div>
          <div className="column is-4-desktop">
            <TopMems />
            <TopUsers />
          </div>
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default withRouter(UserDetails);
