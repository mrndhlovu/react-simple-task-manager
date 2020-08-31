import React, { useState } from "react";

import { useMainContent } from "../../utils/hookUtils";
import CreateItemWrapper from "../shared/CreateItemWrapper";
import UIInput from "../shared/UIInput";

const CreateList = () => {
  const { createListHandler } = useMainContent();
  const [title, setTitle] = useState(undefined);

  const handleChange = (e) => setTitle(e.target.value);

  return (
    <CreateItemWrapper
      buttonText="Create List"
      clickHandler={() => createListHandler(title)}
      className="create__list__form"
      dataTestId="create-list-page"
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

export default CreateList;
