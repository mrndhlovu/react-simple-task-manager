import React from "react";

import CreateItemWrapper from "../shared/CreateItemWrapper";
import UIInput from "../shared/UIInput";

const Login = () => {
  const handleSaveChanges = () => {};
  const handleChange = (field, e) => {};

  return (
    <CreateItemWrapper
      header="Login"
      clickHandler={() => handleSaveChanges()}
      buttonText="Login"
    >
      <UIInput
        id="login-email"
        label="Email Address"
        type="email"
        handleChange={(e) => handleChange("email", e)}
      />

      <UIInput
        id="login-password"
        label="Password"
        type="password"
        handleChange={(e) => handleChange("password", e)}
      />
    </CreateItemWrapper>
  );
};

export default Login;
