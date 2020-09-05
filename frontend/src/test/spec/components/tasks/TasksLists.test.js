/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import historyData from "react-router";
import { act } from "react-dom/test-utils";
import toJSON from "enzyme-to-json";

import { MainContext } from "../../../../js/utils/contextUtils";
import { MOCK_HISTORY_PROPS, MOCK_TASKS_LIST } from "../../../utils";
import TasksListPage from "../../../../js/components/tasks/TasksList";

const CONTEXT_PROPS = {
  taskActionHandler: jest.fn(),
};

const DEFAULT_PROPS = {
  header: "To Do",
  tasks: MOCK_TASKS_LIST,
};

describe("TasksListPage", () => {
  let wrapper;

  const init = async () => {
    jest.spyOn(historyData, "useHistory").mockReturnValue(MOCK_HISTORY_PROPS);
  };

  const setup = async () => {
    await act(
      async () =>
        (wrapper = await render(
          <MainContext.Provider value={CONTEXT_PROPS}>
            <TasksListPage {...DEFAULT_PROPS} />
          </MainContext.Provider>,
        )),
    );
  };

  beforeEach(async () => {
    jest.resetModules();
    init();
    await setup();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render task items and click the edit buttons.", async () => {
    const { getByTestId, getByText } = wrapper;

    getByText(/To Do/);
    getByTestId(/to-do-tasks-header/);
    getByTestId(/to-do-task-item-0/);

    const TASK_TITLE = MOCK_TASKS_LIST[0].title
      .split(" ")
      .join("-")
      .toLowerCase();

    const completeButton = getByTestId(`${TASK_TITLE}-check-edit-button`);
    fireEvent.click(completeButton);
    expect(CONTEXT_PROPS.taskActionHandler).toHaveBeenCalledWith(
      "complete",
      MOCK_TASKS_LIST[0],
    );

    const incompleteButton = getByTestId(`${TASK_TITLE}-x-edit-button`);
    fireEvent.click(incompleteButton);
    expect(CONTEXT_PROPS.taskActionHandler).toHaveBeenCalledWith(
      "incomplete",
      MOCK_TASKS_LIST[0],
    );

    const editButton = getByTestId(`${TASK_TITLE}-pen-edit-button`);
    fireEvent.click(editButton);
    expect(CONTEXT_PROPS.taskActionHandler).toHaveBeenCalledWith(
      "edit",
      MOCK_TASKS_LIST[0],
    );

    const deleteButton = getByTestId(`${TASK_TITLE}-delete-edit-button`);
    fireEvent.click(deleteButton);
    expect(CONTEXT_PROPS.taskActionHandler).toHaveBeenCalledWith(
      "delete",
      MOCK_TASKS_LIST[0],
    );

    expect(CONTEXT_PROPS.taskActionHandler).toHaveBeenCalledTimes(4);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
