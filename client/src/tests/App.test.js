import React from "react";
import { render } from "@testing-library/react";
import App from "../js/App";

test("Renders app container", () => {
  const { getByText } = render(<App />);
  const appElement = getByText(/React App/);
  expect(appElement).toBeDefined();
});
