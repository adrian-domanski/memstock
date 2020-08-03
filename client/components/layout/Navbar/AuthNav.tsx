import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import styled from "styled-components";
import {
  NavbarDropdown,
  NavbarLink,
} from "../../../utils/styled/components/Navbar";

const AuthNav: React.FC = () => {
  const {
    ctx: { user },
    dispatch,
  } = useContext(AuthContext);

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

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_SUCCESS" });
  };

  return (
    <MyProfile>
      <img
        src={
          user.avatar
            ? `${process.env.SERVER_URL}${user.avatar.formats.thumbnail.url}`
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
            <NavbarLink className="navbar-item">About</NavbarLink>
            <NavbarLink className="navbar-item">Jobs</NavbarLink>
            <NavbarLink className="navbar-item">Contact</NavbarLink>
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
