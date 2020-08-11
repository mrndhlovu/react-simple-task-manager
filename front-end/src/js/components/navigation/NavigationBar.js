import React from "react";
import PropTypes from "prop-types";
import LinkItem from "../shared/LinkItem";
import { Plus, Trash2 } from "react-feather";

const NavigationBar = ({ tasks = [], className }) => {
  console.log("NavigationBar -> className", className);
  return (
    <div className={`${className} navigation`}>
      <ul className="nav__list__container">
        <LinkItem content="All" />
        {tasks &&
          tasks.map((task) => (
            <div className="icon__link__container">
              <LinkItem content={task?.title} />
              <Trash2 className="delete__button" size={15} />
            </div>
          ))}
        <div className="icon__link__container">
          <Plus size={15} />
          <LinkItem content="Create New List" />
        </div>
        <LinkItem content="Settings" />
        <LinkItem content="Logout" />
      </ul>
    </div>
  );
};

NavigationBar.propTypes = {
  tasks: PropTypes.array,
  className: PropTypes.string.isRequired,
};

export default NavigationBar;
