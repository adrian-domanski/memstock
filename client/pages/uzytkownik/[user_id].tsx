import { useQuery } from "@apollo/react-hooks";
import { SingletonRouter, withRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
  getUserDetailsQuery,
  countUsersQuery,
} from "../../queries/userQueries";
import Layout from "../../components/layout/Layout/Layout";
import ChangeUserData from "../../components/User/ChangeUserData/ChangeUserData";
import { UserContentHeader } from "../../utils/styled/pages/[user_id]";
import { Avatar, StyledDropdown } from "../../utils/styled/components/MemItem";
import { getRankName, formatDate } from "../../utils/helpers";
import Loader from "../../components/Loader";
import { ContentBody } from "../../utils/styled/components/components";
import MemList from "../../components/Mem/MemList";
import TopMems from "../../components/Mem/TopMems";
import TopUsers from "../../components/Mem/TopUsers";

interface Props {
  router: SingletonRouter;
}

const UserDetails: React.FC<Props> = ({ router }) => {
  const {
    ctx: { user },
  } = useContext(AuthContext);
  const userId = router.query.user_id;
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [isUpdateAvatarModalOpen, setIsUpdateUserDataModalOpen] = useState(
    false
  );

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
      <ChangeUserData
        isOpen={isUpdateAvatarModalOpen}
        actionClose={() => setIsUpdateUserDataModalOpen(false)}
      />
      <div className="columns">
        <div className="column is-8-desktop">
          <div className="user-informations">
            <UserContentHeader>
              <div className="content-wrapper">
                {!userLoading && userData?.user ? (
                  <>
                    <Avatar>
                      <div
                        className="image-wrapper"
                        onClick={() => setIsUpdateUserDataModalOpen(true)}
                      >
                        <img
                          src={
                            userData.user.avatar
                              ? `${process.env.SERVER_URL}${userData.user.avatar.url}`
                              : "/img/avatar-placeholder.jpg"
                          }
                          alt={`Zdjęcie profilowe użytkownika ${userData.user.username}`}
                        />
                      </div>
                      <figcaption>
                        <div className="user-name">
                          {userData.user.username}
                        </div>
                        <div className="user-rank">
                          {getRankName(userData.user.rank)}
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
                            {userId === user?.id && (
                              <button
                                onClick={() =>
                                  setIsUpdateUserDataModalOpen(true)
                                }
                                className="button button-link dropdown-item"
                              >
                                Aktualizuj profil
                              </button>
                            )}
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
          </div>
          <div className="user-content mt-5">
            <MemList
              userMemList
              where={{ user: { id: userId }, isPublic: true }}
            />
          </div>
        </div>
        <div className="column is-4-desktop">
          <TopMems />
          <TopUsers />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(UserDetails);
