import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../../context/authContext";
import {
  NavbarDropdown,
  NavbarLink,
} from "../../../../utils/styled/components/Navbar";
import { MyProfile } from "./styled";

const AuthNav: React.FC = () => {
  const {
    ctx: { user },
    dispatch,
  } = useContext(AuthContext);

  const profileDropdownTriggerEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkIfEnterPressed = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleLogout();
    };

    profileDropdownTriggerEl.current.addEventListener(
      "keypress",
      checkIfEnterPressed
    );

    return () =>
      profileDropdownTriggerEl.current.removeEventListener(
        "keypress",
        checkIfEnterPressed
      );
  }, []);

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
        width={40}
        height={40}
      />
      <figcaption>
        <NavbarDropdown
          reverse
          className="navbar-item has-dropdown is-hoverable"
        >
          <span className="navbar-link" tabIndex={0}>
            {user.username}
          </span>
          <div className="navbar-dropdown">
            <Link
              href="/uzytkownik/[user_id]"
              as={`/uzytkownik/${user.id}`}
              passHref
            >
              <NavbarLink className="navbar-item">Mój profil</NavbarLink>
            </Link>
            <hr className="navbar-divider" />
            <NavbarLink
              ref={profileDropdownTriggerEl}
              as="button"
              tabIndex={0}
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
