import React from "react";
import PropTypes from "prop-types";

import UIInput from "../shared/UIInput";
import CreateItemWrapper from "../shared/CreateItemWrapper";

const CreateTask = ({
  task,
  handleClick,
  handleChange,
  header,
  buttonText,
}) => {
  return (
    <CreateItemWrapper
      clickHandler={handleClick}
      header={header}
      buttonText={buttonText}
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

CreateTask.propTypes = {
  task: PropTypes.object,
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  header: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CreateTask;
