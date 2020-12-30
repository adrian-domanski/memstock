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
import {
  UserContentHeader,
  UserContentBody,
} from "../../utils/styled/pages/[user_id]";
import { Avatar, StyledDropdown } from "../../utils/styled/components/MemItem";
import { getRankName, formatDate } from "../../utils/helpers";
import Loader from "../../components/Loader";
import MemList from "../../components/Mem/MemList";
import {
  ContentHeader,
  StyledTabs,
} from "../../utils/styled/components/components";
import { countMemsQuery } from "../../queries/memQueries";

interface Props {
  router: SingletonRouter;
}

const UserDetails: React.FC<Props> = ({ router }) => {
  const userId = router.query.user_id;
  const {
    ctx: { user },
  } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState<"ALL" | "WAITING">("ALL");
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

  const { data: allMemsCountData, loading: allMemsCountLoading } = useQuery(
    countMemsQuery,
    {
      variables: { where: { "user.id": userId, isPublic: true } },
    }
  );

  const {
    data: waitingMemsCountData,
    loading: waitingMemsCountLoading,
  } = useQuery(countMemsQuery, {
    variables: { where: { "user.id": userId, isPublic: false } },
  });

  const { data: countUsersData, loading: countUsersLoading } = useQuery(
    countUsersQuery,
    {
      variables: { where: { rank_gt: !userLoading && userData.user.rank } },
      skip: userLoading,
    }
  );

  const isItMyAccount = () => userId === user?.id;

  return (
    <Layout topUsers popularMems>
      <ChangeUserData
        isOpen={isUpdateAvatarModalOpen}
        actionClose={() => setIsUpdateUserDataModalOpen(false)}
      />
      <div className="user-informations">
        <UserContentHeader>
          <div className="content-wrapper">
            {!userLoading && userData?.user ? (
              <>
                <Avatar hoverEffect={isItMyAccount()}>
                  <div
                    className="image-wrapper"
                    onClick={() =>
                      isItMyAccount() && setIsUpdateUserDataModalOpen(true)
                    }
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
                    <div className="user-name">{userData.user.username}</div>
                    <div className="user-rank">
                      {getRankName(userData.user.rank)}
                    </div>
                  </figcaption>
                </Avatar>
                {userId === user?.id && (
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
                          <button
                            onClick={() => setIsUpdateUserDataModalOpen(true)}
                            className="button button-link dropdown-item"
                          >
                            Aktualizuj profil
                          </button>
                        </div>
                      </StyledDropdown>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
        </UserContentHeader>
        <UserContentBody>
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
                    <span className="has-text-primary">Data dołączenia:</span>{" "}
                    {formatDate(new Date(userData.user.createdAt))}
                  </li>
                </>
              ) : (
                <Loader />
              )}
            </div>
          </ul>
        </UserContentBody>
      </div>
      <div className="user-content mt-5">
        <ContentHeader className="has-background-black-ter">
          <StyledTabs className="tabs is-primary is-accent">
            <ul>
              <li
                className={activeTab === "ALL" ? "is-active" : ""}
                onClick={() => setActiveTab("ALL")}
              >
                <a>
                  Wszystkie
                  {!allMemsCountLoading &&
                    allMemsCountData &&
                    ` ( ${allMemsCountData.countMems} )`}
                </a>
              </li>
              <li
                className={activeTab === "WAITING" ? "is-active" : ""}
                onClick={() => setActiveTab("WAITING")}
              >
                <a>
                  Oczekujące
                  {!waitingMemsCountLoading &&
                    waitingMemsCountData &&
                    ` ( ${waitingMemsCountData.countMems} )`}
                </a>
              </li>
            </ul>
          </StyledTabs>
        </ContentHeader>
        <MemList
          userMemList
          where={{ user: { id: userId }, isPublic: activeTab === "ALL" }}
        />
      </div>
    </Layout>
  );
};

export default withRouter(UserDetails);
