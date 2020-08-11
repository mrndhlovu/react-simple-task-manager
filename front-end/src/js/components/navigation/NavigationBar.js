import React from "react";
import PropTypes from "prop-types";
import LinkItem from "../shared/LinkItem";
import { Plus, Trash2 } from "react-feather";
import { useHistory } from "react-router";
import { useMainContent } from "../../utils/hookUtils";

const NavigationBar = ({ lists = [], className, toggleMenu }) => {
  const history = useHistory();

  const { handleLogout } = useMainContent();

  const clickHandler = (callback) => {
    toggleMenu();
    return callback();
  };

  return (
    <div className={`${className} navigation`}>
      <ul className="nav__list__container">
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
                  clickHandler(() => history.push(`/list/${list.id}`))
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
