import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { MainContext } from "../../../../js/utils/contextUtils";
import CreateListPage from "../../../../js/components/lists/CreateList";

const CONTEXT_PROPS = {
  createListHandler: jest.fn(),
};

describe("CreateListPage", () => {
  let wrapper;

  const init = () => {
    wrapper = () =>
      render(
        <MainContext.Provider value={CONTEXT_PROPS}>
          <CreateListPage />
        </MainContext.Provider>
      );
  };

  beforeEach(() => {
    init();
  });

  it("should render create list form.", () => {
    const { getByTestId } = wrapper();

    getByTestId(/create-list-page/);
  });

  it("should create a list.", () => {
    const { getByLabelText, getByText } = wrapper();

    const createListInput = getByLabelText(/Title/);

    fireEvent.change(createListInput, {
      target: { value: "Life" },
    });

    fireEvent.click(getByText(/Create List/));

    expect(CONTEXT_PROPS.createListHandler).toHaveBeenCalledWith("Life");
    expect(createListInput.value).toBe("Life");
  });
});
