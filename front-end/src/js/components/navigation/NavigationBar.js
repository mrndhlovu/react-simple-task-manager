import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

import { Plus, Trash2 } from "react-feather";

import { useMainContent } from "../../utils/hookUtils";
import LinkItem from "../shared/LinkItem";

const NavigationBar = ({ lists = [], className, toggleMenu }) => {
  const history = useHistory();

  const { handleLogout, auth } = useMainContent();

  const clickHandler = (callback) => {
    toggleMenu && toggleMenu();
    return callback();
  };

  return (
    <div className={`${className} navigation`}>
      <ul className="nav__list__container">
        {auth?.authenticated ? (
          <>
            <LinkItem
              content="All"
              clickHandler={() => clickHandler(() => history.push("/"))}
            />
            {lists &&
              lists.map((list, index) => (
                <div key={index} className="icon__link__container">
                  <LinkItem
                    content={list?.title}
                    clickHandler={() =>
                      clickHandler(() => history.push(`/lists/${list.id}`))
                    }
                  />
                  <Trash2 className="delete__button" size={15} />
                </div>
              ))}
            <div className="icon__link__container">
              <Plus size={15} />
              <LinkItem
                content="Create New List"
                clickHandler={() =>
                  clickHandler(() => history.push("/create-list"))
                }
              />
            </div>
            <LinkItem
              content="Settings"
              clickHandler={() => clickHandler(() => history.push("/settings"))}
            />
            <LinkItem
              content="Logout"
              clickHandler={() => clickHandler(() => handleLogout())}
            />
          </>
        ) : (
          <>
            <LinkItem
              content="Login"
              clickHandler={() => clickHandler(() => history.push("/login"))}
            />
            <LinkItem
              content="Register"
              clickHandler={() => clickHandler(() => history.push("/register"))}
            />
          </>
        )}
      </ul>
    </div>
  );
};

NavigationBar.propTypes = {
  tasks: PropTypes.array,
  className: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func,
};

export default NavigationBar;
