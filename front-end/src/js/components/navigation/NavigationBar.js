import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import update from "immutability-helper";

import { Plus, Trash2 } from "react-feather";

import { useMainContent } from "../../utils/hookUtils";
import LinkItem from "../shared/LinkItem";

const NavigationBar = ({ className, toggleMenu }) => {
  const history = useHistory();
  const [activeLink, setActiveLink] = useState("all");

  const {
    auth,
    deleteListHandler,
    lists,
    logoutHandler,
    updateListHandler,
  } = useMainContent();

  const clickHandler = (callback, active) => {
    setActiveLink(active.toLowerCase());
    toggleMenu && toggleMenu();
    return callback();
  };

  return (
    <div className={`${className} navigation`}>
      <ul className="nav__list__container">
        {auth?.authenticated ? (
          <>
            <LinkItem
              active={activeLink}
              content="All"
              clickHandler={() => clickHandler(() => history.push("/"), "all")}
            />
            {lists &&
              lists.map((list, index) => (
                <div
                  key={index}
                  className={`icon__link__container ${
                    activeLink === list?.title.toLowerCase()
                      ? "menu__item__active"
                      : ""
                  }`}
                >
                  <LinkItem
                    active={activeLink}
                    content={list?.title}
                    clickHandler={() =>
                      clickHandler(
                        () => history.push(`/lists/${list._id}`),
                        list?.title
                      )
                    }
                  />
                  <Trash2
                    className="delete__button"
                    size={15}
                    onClick={() =>
                      deleteListHandler(list._id, () => {
                        const isListPage =
                          history.location.pathname.split("/")[2] === list._id;

                        const updatedLists = update(lists, {
                          $splice: [[index, 1]],
                        });

                        updateListHandler(updatedLists);

                        if (isListPage) history.push("/");
                      })
                    }
                  />
                </div>
              ))}
            <div className="icon__link__container">
              <Plus size={15} />
              <LinkItem
                active={activeLink}
                content="Create New List"
                clickHandler={() =>
                  clickHandler(
                    () => history.push("/create-list"),
                    "create new list"
                  )
                }
              />
            </div>
            <div className="page__side__settings">
              <LinkItem
                active={activeLink}
                content="Settings"
                clickHandler={() =>
                  clickHandler(() => history.push("/settings"), "settings")
                }
              />
              <LinkItem
                content="Logout"
                clickHandler={() =>
                  clickHandler(() => logoutHandler(), "logout")
                }
              />

              <span className="menu__text ">
                &#169; 2020 NDHLOVU.COM All Rights Reserved
              </span>
            </div>
          </>
        ) : (
          <>
            <LinkItem
              active={activeLink}
              content="Login"
              clickHandler={() =>
                clickHandler(() => history.push("/login"), "login")
              }
            />
            <LinkItem
              content="Register"
              active={activeLink}
              clickHandler={() =>
                clickHandler(() => history.push("/register"), "register")
              }
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
