import React, { useState } from "react";

import { Menu, X } from "react-feather";

import NavigationBar from "./NavigationBar";
import { useHistory } from "react-router-dom";
import Logo from "../shared/Logo";

const NavBar = () => {
  const history = useHistory();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <>
      <header className="nav__bar">
        <Logo history={history} />
        <div className="mobile__icon_container">
          {showMobileMenu ? (
            <X
              className="mobile__menu__icon"
              size={36}
              onClick={() => toggleMenu()}
            />
          ) : (
            <Menu
              className="mobile__menu__icon"
              size={36}
              onClick={() => toggleMenu()}
            />
          )}
        </div>

        <NavigationBar
          className={`${
            showMobileMenu ? "mobile__menu" : ""
          } navigation__menu `}
          toggleMenu={toggleMenu}
        />
      </header>
    </>
  );
};

export default NavBar;
