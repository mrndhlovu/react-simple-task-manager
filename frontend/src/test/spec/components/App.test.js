import React from "react";
import App from "../../../js/App";

import { render } from "@testing-library/react";

describe("App Container", () => {
  it("should render the app content.", () => {
    const { getByTestId, getByText } = render(<App />);

    getByText(/Checklists/);
    getByTestId(/app-container/);
    getByTestId(/navigation-bar/);
  });
});
