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
      clickHandler={() => updateUserHandler(credentials)}
      buttonText="Save Changes"
      dataTestId="settings-form"
    >
      <div className="setting__registration__container">
        <div id="settings-form">
          <UIInput
            id="outlined-name"
            label="First Name"
            placeholder="First Name"
            defaultValue={user?.firstName}
            type="text"
            handleChange={(e) => handleChange("firstName", e)}
          />
          <UIInput
            id="outlined-lastName"
            label="Last Name"
            placeholder="Last Name"
            defaultValue={user?.lastName}
            type="text"
            handleChange={(e) => handleChange("lastName", e)}
          />
        </div>
        <div>
          <UIInput
            id="outlined-email"
            label="Email Address"
            placeholder="Email Address"
            defaultValue={user?.email}
            type="email"
            handleChange={(e) => handleChange("email", e)}
          />

          <UIInput
            id="outlined-password"
            label="Password"
            defaultValue={user?.password}
            type="password"
            handleChange={(e) => handleChange("password", e)}
          />
        </div>
      </div>
      <span className="delete__account__action">
        <button type="submit" onClick={() => deleteAccountHandler()}>
          <span>Delete Account</span>
        </button>
      </span>
    </CreateItemWrapper>
  );
};

export default Settings;
