import React from "react";
import PropTypes from "prop-types";

import UIHeader from "../shared/UIHeader";
import TaskItem from "../shared/TaskItem";

const TasksList = ({ header, tasks, editTaskHandler }) => {
  return (
    <div>
      <UIHeader content={header} />

      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          title={task?.title}
          dueDate={task?.dueDate}
          editTaskHandler={(action) => editTaskHandler(action, task)}
        />
      ))}
    </div>
  );
};

TasksList.propTypes = {
  header: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object.isRequired),
  editTaskHandler: PropTypes.func.isRequired,
};

export default TasksList;
