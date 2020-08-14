import React from "react";
import PropTypes from "prop-types";

import { Card } from "@material-ui/core";
import { CheckCircle, X, Edit2, Trash2 } from "react-feather";

const TaskItem = ({ title, dueDate, editTaskHandler, status }) => {
  return (
    <Card className="task__item">
      <div className="task__item__button__text">
        <ul className="task__action__buttons__container">
          <li
            className={`${
              status === "complete" ? "complete__active" : ""
            } complete__icon`}
            onClick={() => editTaskHandler("complete")}
          >
            <CheckCircle />
          </li>
          <li
            className={`${
              status === "incomplete" ? "incomplete__active" : ""
            } incomplete__icon`}
            onClick={() => editTaskHandler("incomplete")}
          >
            <X />
          </li>
          <li className="edit__icon" onClick={() => editTaskHandler("edit")}>
            <Edit2 />
          </li>
          <li className="delete__icon">
            <Trash2 onClick={() => editTaskHandler("delete")} />
          </li>
        </ul>
        <p className="task__title">{title}</p>
      </div>
      <p
        className={`${
          status === "incomplete"
            ? "task__expired"
            : status === "complete"
            ? "task__completed"
            : "task__todo"
        }`}
      >
        {dueDate}
      </p>
    </Card>
  );
};

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  dueDate: PropTypes.string,
};

export default TaskItem;
