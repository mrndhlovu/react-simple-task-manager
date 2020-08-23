import React from "react";
import { shallow } from "enzyme";
import App from "../../../js/App";

describe("App", () => {
  let container;

  const init = () => {
    container = shallow(<App />);
  };

  beforeEach(() => {
    init();
  });

  it("should render the app content", () => {
    const { children } = container.props();
    expect(children).toBeDefined();
  });
});
