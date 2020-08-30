export const findByDataTestId = (component, id) => {
  const wrapper = component.find(`[data-test-id="${id}"]`);
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

export const emptyFunction = () => {};
