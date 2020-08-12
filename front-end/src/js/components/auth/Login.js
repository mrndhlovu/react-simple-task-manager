import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import { useMainContent } from "../../utils/hookUtils";
import CreateItemWrapper from "../shared/CreateItemWrapper";
import UIInput from "../shared/UIInput";

const INITIAL_STATE = {
  email: undefined,
  password: undefined,
};

const Login = () => {
  const {
    loginHandler,
    auth: { authenticated },
  } = useMainContent();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const [credentials, setCredentials] = useState(INITIAL_STATE);

  const handleChange = (field, e) =>
    setCredentials({ ...credentials, [field]: e.target.value });

  if (authenticated) return <Redirect to={from.pathname} />;

  return (
    <CreateItemWrapper
      header="Login"
      clickHandler={() => loginHandler(credentials)}
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
