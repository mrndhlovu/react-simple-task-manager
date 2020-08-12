import React from "react";
import PropTypes from "prop-types";
import CreateItemWrapper from "../shared/CreateItemWrapper";
import UIInput from "../shared/UIInput";

const Settings = ({ user = {} }) => {
  const handleSaveChanges = () => {};
  const handleChange = (field, e) => {};

  return (
    <CreateItemWrapper
      header="Account Details"
      clickHandler={() => handleSaveChanges()}
      buttonText="Save Changes"
    >
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
    </CreateItemWrapper>
  );
};

Settings.propTypes = {
  user: PropTypes.object,
};

export default Settings;
