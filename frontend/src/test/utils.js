export const findByDataTestId = (component, id) => {
  const wrapper = component.find(`[data-testid="${id}"]`);
  return wrapper;
};

export const mockWindowObject = (pathname) => {
  global.window = Object.create(window);

  Object.defineProperty(window, "location", {
    value: {
      pathname,
    },
  });
};

export const MOCK_LOCATION_PROPS = {
  pathname: "/",
  hash: "",
  search: "",
  state: "",
};

export const MOCK_HISTORY_PROPS = {
  push: jest.fn(),
};

export const MOCK_TASKS_LIST = [
  {
    _id: "5f48e76b35a11af4423edbab",
    archived: false,
    list: "5f45773a6eecfbe4212131ca",
    listName: "Life",
    owner: "41cb0cff4e18556ec61fd0",
    status: "todo",
    title: "Shopping",
    dueDate: "2020-09-01T00:25",
  },

  {
    _id: "5f48e76b35a11af4423edb",
    archived: false,
    list: "5f45773a6eecfbe4212131",
    listName: "Life",
    owner: "41cb0cff4e18556ec61fd0",
    status: "complete",
    title: "Workout",
    dueDate: "2020-09-01T00:15",
  },
  {
    _id: "5f48e76ba11af4423edb",
    archived: false,
    dueDate: "2020-09-01T00:15",
    listName: "Life",
    owner: "41cb0cff4e18556ec61fd0",
    status: "incomplete",
    title: "Workout",
  },
];

export const MOCK_LIST = Object.freeze({
  _id: "5f45773a6eecfbe4212131ca",
  title: "Life",
});

export const MOCK_PARAMS_PROPS = {
  listId: MOCK_LIST._id,
};

export const emptyFunction = () => {};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
