import React from "react";
import PropTypes from "prop-types";

import { Card } from "@material-ui/core";
import { CheckCircle, X, Edit2, Trash2 } from "react-feather";

const TaskItem = ({ title, dueDate, editTaskHandler }) => {
  return (
    <Card className="task__item">
      <ul className="task__action__buttons__container">
        <li onClick={() => editTaskHandler("complete")}>
          <CheckCircle />
        </li>
        <li onClick={() => editTaskHandler("incomplete")}>
          <X />
        </li>
        <li onClick={() => editTaskHandler("edit")}>
          <Edit2 />
        </li>
        <li>
          <Trash2 onClick={() => editTaskHandler("delete")} />
        </li>
      </ul>
      <p className="task__title">{title}</p>
      <p className="task__duedate">{dueDate}</p>
    </Card>
  );
};

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  dueDate: PropTypes.string,
};

export default TaskItem;
