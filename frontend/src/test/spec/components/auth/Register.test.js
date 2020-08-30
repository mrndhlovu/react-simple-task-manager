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

describe("RegisterPage", () => {
  let wrapper;

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

    const firstNameInput = getByLabelText(/First Name/);
    const lastNameInput = getByLabelText(/Last Name/);
    const emailInput = getByLabelText(/Email Address/);
    const passwordInput = getByLabelText(/Password/);

    fireEvent.change(firstNameInput, {
      target: { value: "Mock Name" },
    });

    fireEvent.change(lastNameInput, {
      target: { value: "Mock LastName" },
    });
    fireEvent.change(emailInput, {
      target: { value: "testemail@testing.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "fakePassCode" } });
    fireEvent.click(getByText(/Register/));

    expect(CONTEXT_PROPS.registrationHandler).toHaveBeenCalledTimes(1);
  });
});
