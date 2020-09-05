import React from "react";
import { render } from "@testing-library/react";
import App from "../../../js/App";

describe("App Container", () => {
  it("should render the app content.", () => {
    const { getByTestId, getByText } = render(<App />);

    getByText(/Checklists/);
    getByTestId(/app-container/);
    getByTestId(/navigation-bar/);
  });
});
