import React from "react";

import CreateItemWrapper from "../shared/CreateItemWrapper";
import UIInput from "../shared/UIInput";

const Register = () => {
  const handleRegister = () => {};
  const handleChange = (field, e) => {};

  return (
    <CreateItemWrapper
      header="Register"
      clickHandler={() => handleRegister()}
      buttonText="Register"
    >
      <UIInput
        id="register-name"
        label="First Name"
        type="text"
        handleChange={(e) => handleChange("lastName", e)}
      />
      <UIInput
        id="register-lastname"
        label="Last Name"
        type="text"
        handleChange={(e) => handleChange("firstName", e)}
      />

      <UIInput
        id="register-email"
        label="Email Address"
        type="email"
        handleChange={(e) => handleChange("email", e)}
      />

      <UIInput
        id="register-password"
        label="Password"
        type="password"
        handleChange={(e) => handleChange("password", e)}
      />
    </CreateItemWrapper>
  );
};

export default Register;
