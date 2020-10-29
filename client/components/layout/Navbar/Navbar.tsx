import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { isPageAdmin } from "../../../utils/helpers";
import { Button } from "../../../utils/styled/components/components";
import {
  Logo,
  NavbarDropdown,
  NavbarLink,
  PrimaryNavbar,
  SecondaryNavbar,
  StyledAuthNavbar,
  StyledNavbar,
} from "../../../utils/styled/components/Navbar";
import AuthNav from "./AuthNav";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";

interface Props {
  router: SingletonRouter;
}

const Navbar: React.FC<Props> = ({ router }) => {
  const {
    ctx: { isAuth, user },
  } = useContext(AuthContext);

  useEffect(() => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  }, []);

  return (
    <nav>
      <PrimaryNavbar>
        <StyledNavbar
          className="navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link href="/">
              <a>
                <Logo className="navbar-item">
                  <img
                    src="/img/logo.png"
                    alt="Logo strony MemStock"
                    className="image"
                  />
                  <figcaption>
                    <span>Mem</span>Stock
                  </figcaption>
                </Logo>
              </a>
            </Link>

            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <Link href="/">
                <NavbarLink
                  className={`${router.pathname === "/" && "active"}`}
                >
                  Strona Główna
                </NavbarLink>
              </Link>
              <NavbarDropdown className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Dodaj</a>

                <div className="navbar-dropdown">
                  <Link href="/generator-memow">
                    <NavbarLink>Generator memów</NavbarLink>
                  </Link>
                  <Link href="/dodaj-mema">
                    <NavbarLink>Dodaj mema</NavbarLink>
                  </Link>
                </div>
              </NavbarDropdown>
              {isAuth && isPageAdmin(user.role) && (
                <NavbarDropdown className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Admin</a>

                  <div className="navbar-dropdown">
                    <Link href="/cms/poczekalnia">
                      <NavbarLink>Poczekalnia</NavbarLink>
                    </Link>
                    <Link href="/cms/zgloszenia">
                      <NavbarLink>Zgłoszenia</NavbarLink>
                    </Link>
                  </div>
                </NavbarDropdown>
              )}
            </div>
            <StyledAuthNavbar className="navbar-item is-hidden-desktop px-0 is-flex">
              {isAuth ? <AuthNav /> : <AuthButtons className="margin-auto" />}
            </StyledAuthNavbar>
            <SearchBar />
          </div>
        </StyledNavbar>
      </PrimaryNavbar>

      <SecondaryNavbar>
        <StyledNavbar>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item px-0">
                {isAuth ? <AuthNav /> : <AuthButtons />}
              </div>
            </div>
          </div>
        </StyledNavbar>
      </SecondaryNavbar>
    </nav>
  );
};

export default withRouter(Navbar);
