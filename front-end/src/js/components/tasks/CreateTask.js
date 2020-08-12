import React from "react";
import PropTypes from "prop-types";

import UIInput from "../shared/UIInput";
import CreateItemWrapper from "../shared/CreateItemWrapper";

const CreateTask = ({
  task,
  handleClick,
  handleChange,
  header = "Create New Task",
}) => {
  return (
    <CreateItemWrapper
      buttonText="Create Task"
      clickHandler={handleClick}
      header={header}
    >
      <UIInput
        id="task-title"
        label="Title"
        placeholder="e.g. Go to the gym"
        type="text"
        handleChange={(e) => handleChange("title", e)}
        defaultValue={task?.title}
      />
      <UIInput
        id="task-duedate"
        type="text"
        label="Due Date"
        placeholder="Tuesday 11th August"
        handleChange={(e) => handleChange("dueDate", e)}
        defaultValue={task?.dueDate}
      />
    </CreateItemWrapper>
  );
};

CreateTask.propTypes = {};

export default CreateTask;
