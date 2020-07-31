import React, { useEffect } from "react";
import {
  NavbarDropdown,
  NavbarLink,
  PrimaryNavbar,
  SecondaryNavbar,
  StyledNavbar,
  SearchBar,
  Logo,
} from "../../utils/styled/components/Navbar";
import { Button, Input } from "../../utils/styled/components/components";
import Link from "next/link";
import { withRouter, SingletonRouter } from "next/router";
import styled from "styled-components";

interface Props {
  router: SingletonRouter;
}

const Navbar: React.FC<Props> = ({ router }) => {
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
              <Link href="/memy">
                <NavbarLink
                  className={`navbar-item ${
                    router.pathname === "/memy" && "active"
                  }`}
                >
                  Memy
                </NavbarLink>
              </Link>
              <Link href="/filmy">
                <NavbarLink
                  className={`navbar-item ${
                    router.pathname === "/filmy" && "active"
                  }`}
                >
                  Filmy
                </NavbarLink>
              </Link>

              <NavbarDropdown className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More</a>

                <div className="navbar-dropdown">
                  <NavbarLink className="navbar-item">About</NavbarLink>
                  <NavbarLink className="navbar-item">Jobs</NavbarLink>
                  <NavbarLink className="navbar-item">Contact</NavbarLink>
                  <hr className="navbar-divider" />
                  <NavbarLink className="navbar-item">
                    Report an issue
                  </NavbarLink>
                </div>
              </NavbarDropdown>
            </div>
            <div className="navbar-item is-hidden-desktop px-0 is-flex">
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
            </div>
            <SearchBar className="field is-grouped">
              <p className="control is-expanded mr-0">
                <Input type="text" placeholder="Szukaj mema..." />
              </p>
              <p className="control">
                <a className="button is-primary">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </a>
              </p>
            </SearchBar>
          </div>
        </StyledNavbar>
      </PrimaryNavbar>

      <SecondaryNavbar>
        <StyledNavbar>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item px-0">
                <div className="buttons">
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
              </div>
            </div>
          </div>
        </StyledNavbar>
      </SecondaryNavbar>
    </nav>
  );
};

export default withRouter(Navbar);
