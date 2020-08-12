import React from "react";
import PropTypes from "prop-types";
import CreateItemWrapper from "../shared/CreateItemWrapper";
import UIInput from "../shared/UIInput";

const CreateList = () => {
  const handleCreateList = () => {};
  const handleChange = (e) => {};

  return (
    <CreateItemWrapper
      buttonText="Create List"
      clickHandler={() => handleCreateList()}
      header="Create New List"
      className="create__list__form"
    >
      <UIInput
        placeholder="e.g Workout"
        type="text"
        label="Title"
        handleChange={(e) => handleChange(e)}
      />
    </CreateItemWrapper>
  );
};

CreateList.propTypes = {};

export default CreateList;
