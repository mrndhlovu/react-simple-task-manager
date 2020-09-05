/* eslint-disable no-return-assign */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import historyData from "react-router";
import { act } from "react-dom/test-utils";

import { MainContext } from "../../../../js/utils/contextUtils";
import ListPage from "../../../../js/components/lists/List";
import {
  MOCK_HISTORY_PROPS,
  MOCK_PARAMS_PROPS,
  MOCK_TASKS_LIST,
  MOCK_LIST,
} from "../../../utils";

const CONTEXT_PROPS = {
  createTaskHandler: jest.fn(),
  tasks: [],
};

jest.mock("../../../../js/apis/tasksApiRequests", () => ({
  __esModule: true,
  default: "requestList",
  requestList: async () => ({ data: MOCK_LIST }),
}));

describe("ListPage", () => {
  let wrapper;

  const init = async () => {
    jest.spyOn(historyData, "useHistory").mockReturnValue(MOCK_HISTORY_PROPS);
    jest.spyOn(historyData, "useParams").mockReturnValue(MOCK_PARAMS_PROPS);
  };

  const setup = async (props) => {
    await act(
      async () =>
        (wrapper = await render(
          <MainContext.Provider value={props}>
            <ListPage />
          </MainContext.Provider>,
        )),
    );
  };

  beforeEach(() => {
    jest.resetModules();
    init();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render a create task form tasks and create a task.", async () => {
    await setup(CONTEXT_PROPS);
    const { getByTestId, getByLabelText, getByText } = wrapper;

    getByTestId(/create-task-form/);
    const createTaskInput = getByLabelText(/Title/);

    fireEvent.change(createTaskInput, {
      target: { value: "Gym at 4pm" },
    });
    fireEvent.click(getByText(/Create New Task/));
  });

  it("should render tasks within list", async () => {
    await setup({ ...CONTEXT_PROPS, tasks: MOCK_TASKS_LIST });
    const {
      getByTestId, getByText, findAllByText, getAllByTestId,
    } = wrapper;

    getByText(/To Do/);
    getByTestId(/to-do-tasks-header/);

    getByText(/In Complete/);
    getByTestId(/in-complete-tasks-header/);

    findAllByText(/Complete/);
    getAllByTestId(/complete-tasks-header/);
  });
});
