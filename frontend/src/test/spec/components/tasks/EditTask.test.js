import React from "react";
import { render, fireEvent } from "@testing-library/react";
import historyData from "react-router";
import { act } from "react-dom/test-utils";

import { MainContext } from "../../../../js/utils/contextUtils";
import { MOCK_PARAMS_PROPS, MOCK_TASKS_LIST } from "../../../utils";
import EditTaskPage from "../../../../js/components/tasks/EditTask";

const CONTEXT_PROPS = {
  updatedTaskHandler: jest.fn(),
  tasks: MOCK_TASKS_LIST,
  notify: jest.fn(),
};

jest.mock("../../../../js/apis/tasksApiRequests", () => {
  return {
    __esModule: true,
    default: "requestTask",
    requestTask: async () => ({ data: MOCK_TASKS_LIST[0] }),
  };
});

describe("ListPage", () => {
  let wrapper;

  const init = async () => {
    jest.spyOn(historyData, "useParams").mockReturnValue(MOCK_PARAMS_PROPS);
  };

  const setup = async (props) => {
    await act(
      async () =>
        (wrapper = await render(
          <MainContext.Provider value={props}>
            <EditTaskPage />
          </MainContext.Provider>
        ))
    );
  };

  beforeEach(() => {
    jest.resetModules();
    init();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should edit a task.", async () => {
    await setup(CONTEXT_PROPS);
    const { getByTestId, getByLabelText, getByText } = wrapper;
    getByTestId(/edit-task-form/);

    const editTaskInput = getByLabelText(/Title/);
    fireEvent.change(editTaskInput, {
      target: { value: "Gym at 10pm" },
    });

    fireEvent.click(getByText(/Save Changes/));
    expect(editTaskInput.value).toBe("Gym at 10pm");
  });
});
