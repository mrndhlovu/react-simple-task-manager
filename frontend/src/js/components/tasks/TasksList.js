import React from "react";
import PropTypes from "prop-types";

import UIHeader from "../shared/UIHeader";
import TaskItem from "../shared/TaskItem";
import { useMainContent } from "../../utils/hookUtils";
import { useHistory } from "react-router";

const TasksList = ({ header, tasks }) => {
  const { taskActionHandler } = useMainContent();
  const history = useHistory();
  const hasTasks = tasks.length !== 0;

  return hasTasks ? (
    <>
      <UIHeader
        dataTestId={`${header.split(" ").join("-").toLowerCase()}-tasks-header`}
        content={header}
      />

      {tasks.map((task, index) => (
        <TaskItem
          dataTestId={`${header
            .split(" ")
            .join("-")
            .toLowerCase()}-task-item-${index}`}
          key={task._id}
          title={task?.title}
          dueDate={task?.dueDate}
          status={task?.status}
          list={task?.listName}
          onListClickHandler={() => history.push(`/lists/${task?.list}`)}
          editTaskHandler={(action) => taskActionHandler(action, task)}
        />
      ))}
    </>
  ) : null;
};

TasksList.defaultProps = {
  tasks: [],
};

TasksList.propTypes = {
  header: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

export default TasksList;
