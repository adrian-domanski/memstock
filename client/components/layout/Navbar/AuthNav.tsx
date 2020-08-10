import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../context/authContext";
import {
  NavbarDropdown,
  NavbarLink,
} from "../../../utils/styled/components/Navbar";

const MyProfile = styled.figure`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: block;
    object-fit: cover;
    object-position: center;
    max-height: unset;
  }

  figcaption {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const AuthNav: React.FC = () => {
  const {
    ctx: { user },
    dispatch,
  } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_SUCCESS" });
  };

  return (
    <MyProfile>
      <img
        src={
          user.avatar
            ? `${process.env.SERVER_URL}${user.avatar.url}`
            : "/img/avatar-placeholder.jpg"
        }
        alt={`Zdjęcie profilowe użytkownika ${user.username}`}
      />
      <figcaption>
        <NavbarDropdown
          reverse
          className="navbar-item has-dropdown is-hoverable"
        >
          <a className="navbar-link">{user.username}</a>

          <div className="navbar-dropdown">
            <Link href="/uzytkownik/[user_id]" as={`/uzytkownik/${user.id}`}>
              <NavbarLink className="navbar-item">Mój profil</NavbarLink>
            </Link>
            <hr className="navbar-divider" />
            <NavbarLink
              className="navbar-item has-text-danger"
              onClick={handleLogout}
            >
              Wyloguj
            </NavbarLink>
          </div>
        </NavbarDropdown>
      </figcaption>
    </MyProfile>
  );
};
export default AuthNav;
