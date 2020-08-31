import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { MainContext } from "../../../../js/utils/contextUtils";
import SettingsPage from "../../../../js/components/auth/Settings";

const CONTEXT_PROPS = {
  deleteAccountHandler: jest.fn(),
  updateUserHandler: jest.fn(),
  auth: {
    user: {
      firstName: "test-firstname",
      email: "test-user@testing.com",
      lastName: "test-lastname",
    },
  },
};

describe("SettingsPage", () => {
  let wrapper;

  const init = () => {
    wrapper = () =>
      render(
        <MainContext.Provider value={CONTEXT_PROPS}>
          <SettingsPage />
        </MainContext.Provider>
      );
  };

  beforeEach(() => {
    init();
  });

  it("should render settings form.", () => {
    const { getByTestId } = wrapper();

    getByTestId(/settings-form/);
  });

  it("should edit user.", () => {
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
    fireEvent.click(getByText(/Delete Account/));
    fireEvent.click(getByText(/Save Changes/));

    expect(firstNameInput.defaultValue).toBe(CONTEXT_PROPS.auth.user.firstName);
    expect(CONTEXT_PROPS.deleteAccountHandler).toHaveBeenCalledTimes(1);
    expect(CONTEXT_PROPS.updateUserHandler).toHaveBeenCalledTimes(1);
    expect(emailInput.value).toBe("testemail@testing.com");
  });
});
