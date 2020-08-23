/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from "react";

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
      clickHandler={
        () =>
          handleButtonClick(newTask, () =>
            resetForm([`${inputId}-title`, `${inputId}-duedate`])
          )
        // eslint-disable-next-line react/jsx-curly-newline
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
        placeholder={task?.dueDate || getLocaleString()}
      />
    </CreateItemWrapper>
  );
};

export default CreateTask;
