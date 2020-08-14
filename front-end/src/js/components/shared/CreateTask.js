import React, { useState } from "react";
import PropTypes from "prop-types";

import CreateItemWrapper from "./CreateItemWrapper";
import UIInput from "./UIInput";
import { resetForm } from "../../utils/appUtils";

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
  header: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default CreateTask;
