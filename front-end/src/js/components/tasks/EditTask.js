import React from "react";
import PropTypes from "prop-types";

import CreateTask from "./CreateTask";

const EditTask = () => {
  const handleSaveTaskChanges = () => {};

  const handleChange = (field, e) => {
    console.log("handleChange -> field, e", field, e);
  };

  return (
    <CreateTask
      header="Edit Task"
      task={{ title: "New task", dueDate: "12 February 2090" }}
      handleClick={() => handleSaveTaskChanges()}
      handleChange={handleChange}
    />
  );
};

EditTask.propTypes = {};

export default EditTask;
