import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { isPageAdmin } from "../../../utils/helpers";
import { Button, Input } from "../../../utils/styled/components/components";
import {
  Logo,
  NavbarDropdown,
  NavbarLink,
  PrimaryNavbar,
  SecondaryNavbar,
  StyledNavbar,
} from "../../../utils/styled/components/Navbar";
import AuthNav from "./AuthNav";
import SearchBar from "./SearchBar";

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
                  <span>Mem</span>Stock
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
                  className={`navbar-item ${
                    router.pathname === "/" && "active"
                  }`}
                >
                  Strona Główna
                </NavbarLink>
              </Link>
              <NavbarDropdown className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Dodaj</a>

                <div className="navbar-dropdown">
                  <NavbarLink className="navbar-item">
                    Generator memów
                  </NavbarLink>
                  <Link href="/dodaj-mema">
                    <NavbarLink className="navbar-item">
                      Własnego mema
                    </NavbarLink>
                  </Link>
                </div>
              </NavbarDropdown>
              {isAuth && isPageAdmin(user.role) && (
                <NavbarDropdown className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Admin</a>

                  <div className="navbar-dropdown">
                    <Link href="/cms/poczekalnia">
                      <NavbarLink className="navbar-item">
                        Poczekalnia
                      </NavbarLink>
                    </Link>
                    <Link href="/cms/zgloszenia">
                      <NavbarLink className="navbar-item">
                        Zgłoszenia
                      </NavbarLink>
                    </Link>
                  </div>
                </NavbarDropdown>
              )}
            </div>
            <div className="navbar-item is-hidden-desktop px-0 is-flex">
              {isAuth ? (
                <AuthNav />
              ) : (
                <div className="buttons margin-auto">
                  <Link href="/rejestracja">
                    <Button as="a" className="is-primary is-size-6 px-4 mr-4">
                      Rejestracja
                    </Button>
                  </Link>
                  <Link href="/logowanie">
                    <Button as="a" className="is-primary light is-size-6 px-4">
                      Logowanie
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <SearchBar />
          </div>
        </StyledNavbar>
      </PrimaryNavbar>

      <SecondaryNavbar>
        <StyledNavbar>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item px-0">
                {isAuth ? (
                  <AuthNav />
                ) : (
                  <div className="buttons">
                    <Link href="/rejestracja">
                      <Button as="a" className="is-primary is-size-6 px-4 mr-4">
                        Rejestracja
                      </Button>
                    </Link>
                    <Link href="/logowanie">
                      <Button
                        as="a"
                        className="is-primary light is-size-6 px-4"
                      >
                        Logowanie
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </StyledNavbar>
      </SecondaryNavbar>
    </nav>
  );
};

export default withRouter(Navbar);
