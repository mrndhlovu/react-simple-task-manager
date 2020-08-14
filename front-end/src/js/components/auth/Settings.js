import React, { useState } from "react";

import { useMainContent } from "../../utils/hookUtils";
import CreateItemWrapper from "../shared/CreateItemWrapper";
import UIInput from "../shared/UIInput";

const Settings = () => {
  const {
    auth: { user },
    deleteAccountHandler,
    updateUserHandler,
  } = useMainContent();

  const [credentials, setCredentials] = useState({ ...user });

  const handleChange = (field, e) => {
    setCredentials({ ...credentials, [field]: e.target.value });
  };

  return (
    <CreateItemWrapper
      header="Account Details"
      clickHandler={() => updateUserHandler(credentials)}
      buttonText="Save Changes"
    >
      <div className="setting__registration__container">
        <div>
          <UIInput
            id="outlined-search"
            label="First Name"
            defaultValue={user?.lastName}
            type="text"
            handleChange={(e) => handleChange("lastName", e)}
          />
          <UIInput
            id="outlined-search"
            label="Last Name"
            defaultValue={user?.firstName}
            type="text"
            handleChange={(e) => handleChange("firstName", e)}
          />
        </div>
        <div>
          <UIInput
            id="outlined-search"
            label="Email Address"
            defaultValue={user?.email}
            type="email"
            handleChange={(e) => handleChange("email", e)}
          />

          <UIInput
            id="outlined-search"
            label="Password"
            defaultValue={user?.password}
            type="password"
            handleChange={(e) => handleChange("password", e)}
          />
        </div>
      </div>
      <span className="delete__account__action">
        <button onClick={() => deleteAccountHandler()}>Delete Account</button>
      </span>
    </CreateItemWrapper>
  );
};

export default Settings;
