import PopAlert from "./PopAlert";
import { cleanup } from "@testing-library/react";
import React from "react";
import { renderWithRedux } from "../../utils/testRenderWithRedux";

const startingState = {
  canvas: {
    alertMessage: "this is a test warning",
  },
};

const reducer = (state = startingState, action) => {
  switch (action.type) {
    case "UPDATE_ALERT":
      return {
        ...state,
        canvas: { alertMessage: action.payload },
      };

    default:
      return state;
  }
};

describe("Pop Alert", () => {
  afterEach(cleanup);

  it("should match snapshot", () => {
    expect(renderWithRedux(<PopAlert />, reducer)).toMatchSnapshot();
  });

  it("should show the alert text", () => {
    const { getByText } = renderWithRedux(<PopAlert />, reducer);

    const alertText = getByText("this is a test warning");
    expect(alertText).not.toBe(null);
  });
});
