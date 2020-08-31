import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { MainContext } from "../../../../js/utils/contextUtils";
import { MOCK_LOCATION_PROPS } from "../../../utils";
import RegisterPage from "../../../../js/components/auth/Register";
import routeData from "react-router";

const CONTEXT_PROPS = {
  registrationHandler: jest.fn(),
  auth: { authenticated: false },
};

let USER = {
  firstName: "Mock Name",
  lastName: "Mock LastName",
  email: "testemail@testing.com",
  password: "fakePassCode",
};

describe("RegisterPage", () => {
  let wrapper, firstNameInput, emailInput, passwordInput, lastNameInput;

  const init = () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(MOCK_LOCATION_PROPS);

    wrapper = () =>
      render(
        <MainContext.Provider value={CONTEXT_PROPS}>
          <RegisterPage />
        </MainContext.Provider>
      );
  };

  beforeEach(() => {
    init();
  });

  it("should render register form.", () => {
    const { getByText, getByTestId } = wrapper();

    getByText(/Register/);
    getByTestId(/registration-form/);
  });

  it("should register user.", () => {
    const { getByLabelText, getByText } = wrapper();

    firstNameInput = getByLabelText(/First Name/);
    lastNameInput = getByLabelText(/Last Name/);
    emailInput = getByLabelText(/Email Address/);
    passwordInput = getByLabelText(/Password/);

    fireEvent.change(firstNameInput, {
      target: { value: USER.firstName },
    });

    fireEvent.change(lastNameInput, {
      target: { value: USER.lastName },
    });
    fireEvent.change(emailInput, {
      target: { value: USER.email },
    });
    fireEvent.change(passwordInput, { target: { value: USER.password } });
    fireEvent.click(getByText(/Register/));
    expect(CONTEXT_PROPS.registrationHandler).toHaveBeenCalledTimes(1);
  });
});
