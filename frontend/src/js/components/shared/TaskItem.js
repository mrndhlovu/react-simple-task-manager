/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import PropTypes from "prop-types";

import { Card } from "@material-ui/core";
import { CheckCircle, X, Edit2, Trash2 } from "react-feather";
import {
  getFormattedDateString,
  taskStylingClassName,
  capitalize,
} from "../../utils/appUtils";

const TaskItem = ({
  title,
  dueDate,
  editTaskHandler,
  status,
  list,
  onListClickHandler,
  dataTestId,
}) => {
  const testIdPrefix = title.toLowerCase().split(" ").join("-");

  return (
    <Card data-testid={dataTestId} className="task__item">
      <div className="task__item__button__text">
        <ul className="task__action__buttons__container">
          <li
            className={`${
              status === "complete" ? "complete__active" : ""
            } complete__icon`}
            onClick={() => editTaskHandler("complete")}
            data-testid={`${testIdPrefix}-check-edit-button`}
          >
            <CheckCircle />
          </li>
          <li
            className={`${
              status === "incomplete" ? "incomplete__active" : ""
            } incomplete__icon`}
            onClick={() => editTaskHandler("incomplete")}
            data-testid={`${testIdPrefix}-x-edit-button`}
          >
            <X />
          </li>
          <li
            className="edit__icon"
            onClick={() => editTaskHandler("edit")}
            data-testid={`${testIdPrefix}-pen-edit-button`}
          >
            <Edit2 />
          </li>
          <li
            className="delete__icon"
            onClick={() => editTaskHandler("delete")}
            data-testid={`${testIdPrefix}-delete-edit-button`}
          >
            <Trash2 />
          </li>
        </ul>
        <div className="task__item__description">
          <p className="task__title">{capitalize(title)}</p>
          <p className="task__list" onClick={onListClickHandler}>
            {capitalize(list)}
          </p>
        </div>
      </div>
      <p className={taskStylingClassName(status, dueDate)}>
        {dueDate
          ? getFormattedDateString(dueDate, status)
          : "Due date not set!"}
      </p>
    </Card>
  );
};

TaskItem.defaultProps = {
  dueDate: "",
  onListClickHandler: () => {},
  list: "",
  dataTestId: "",
};

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  onListClickHandler: PropTypes.func,
  dueDate: PropTypes.string,
  status: PropTypes.string.isRequired,
  list: PropTypes.string,
  dataTestId: PropTypes.string,
  editTaskHandler: PropTypes.func.isRequired,
};

export default TaskItem;
