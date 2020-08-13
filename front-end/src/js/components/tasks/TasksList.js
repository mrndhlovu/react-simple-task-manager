import React from "react";
import PropTypes from "prop-types";

import UIHeader from "../shared/UIHeader";
import TaskItem from "../shared/TaskItem";
import { useTaskContent } from "../../utils/hookUtils";

const TasksList = ({ header, tasks }) => {
  const { taskActionHandler } = useTaskContent();

  return (
    <div>
      <UIHeader content={header} />

      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          title={task?.title}
          dueDate={task?.dueDate}
          editTaskHandler={(action) => taskActionHandler(action, task)}
        />
      ))}
    </div>
  );
};

TasksList.propTypes = {
  header: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default TasksList;
