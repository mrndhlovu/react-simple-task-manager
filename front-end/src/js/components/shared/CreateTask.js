import React, { useState } from "react";
import PropTypes from "prop-types";

import { resetForm, getLocaleString } from "../../utils/appUtils";
import CreateItemWrapper from "./CreateItemWrapper";
import UIInput from "./UIInput";

const INITIAL_STATE = {
  title: undefined,
  dueDate: undefined,
};

const CreateTask = ({ task, buttonText, handleButtonClick }) => {
  const [newTask, setNewTask] = useState(task || INITIAL_STATE);

  const inputId = buttonText.toLowerCase().split(" ").join("-");

  const handleChange = (field, e) => {
    setNewTask({ ...newTask, [field]: e.target.value });
  };

  return (
    <CreateItemWrapper
      clickHandler={() =>
        handleButtonClick(newTask, () =>
          resetForm([`${inputId}-title`, `${inputId}-duedate`])
        )
      }
      buttonText={buttonText}
    >
      <UIInput
        id={`${inputId}-title`}
        label="Title"
        placeholder="e.g. Go to the gym"
        type="text"
        handleChange={(e) => handleChange("title", e)}
        defaultValue={task?.title}
      />
      <UIInput
        id={`${inputId}-duedate`}
        type="datetime-local"
        label="Due Date"
        handleChange={(e) => handleChange("dueDate", e)}
        defaultValue={task?.dueDate || getLocaleString()}
      />
    </CreateItemWrapper>
  );
};

CreateTask.propTypes = {
  task: PropTypes.object,
  buttonText: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default CreateTask;
