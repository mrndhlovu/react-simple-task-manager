import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { MainContext } from "../../../../js/utils/contextUtils";
import { MOCK_LOCATION_PROPS } from "../../../utils";
import LoginPage from "../../../../js/components/auth/Login";
import routeData from "react-router";

const CONTEXT_PROPS = {
  loginHandler: jest.fn(),
  auth: { authenticated: false },
};

describe("LoginPage", () => {
  let wrapper;

  const init = () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(MOCK_LOCATION_PROPS);

    wrapper = () =>
      render(
        <MainContext.Provider value={CONTEXT_PROPS}>
          <LoginPage />
        </MainContext.Provider>
      );
  };

  beforeEach(() => {
    init();
  });

  it("should render login form.", () => {
    const { getByText, getByTestId } = wrapper();

    getByText(/Login/);
    getByTestId(/login-form/);
  });

  it("should login user.", () => {
    const { getByLabelText, getByText } = wrapper();

    const emailInput = getByLabelText(/Email Address/);
    const passwordInput = getByLabelText(/Password/);

    fireEvent.change(emailInput, {
      target: { value: "testemail@testing.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "fakePassCode" } });
    fireEvent.click(getByText(/Login/));

    expect(CONTEXT_PROPS.loginHandler).toHaveBeenCalledTimes(1);
  });
});
