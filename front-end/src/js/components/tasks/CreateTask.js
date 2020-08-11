import React from "react";
import PropTypes from "prop-types";

import UIInput from "../shared/UIInput";
import CreateItemWrapper from "../shared/CreateItemWrapper";

const CreateTask = () => {
  const handleCreateTask = () => {};

  const handleChange = (field, e) => {
    console.log("handleChange -> field, e", field, e);
  };

  return (
    <CreateItemWrapper
      buttonText="Create Task"
      clickHandler={handleCreateTask}
      header="Create New Task"
    >
      <UIInput
        id="outlined-search"
        label="Title"
        placeholder="e.g. Go to the gym"
        type="text"
        handleChange={(e) => handleChange("title", e)}
      />
      <UIInput
        id="outlined-search"
        type="text"
        label="Due Date"
        placeholder="Tuesday 11th August"
        handleChange={(e) => handleChange("dueDate", e)}
      />
    </CreateItemWrapper>
  );
};

CreateTask.propTypes = {};

export default CreateTask;
