import React from "react";
import { render } from "@testing-library/react";
import App from "../js/App";

// eslint-disable-next-line no-undef
test("Renders app container", () => {
  const { getByText } = render(<App />);
  const appElement = getByText(/Checklists/);
  // eslint-disable-next-line no-undef
  expect(appElement).toBeDefined();
});
