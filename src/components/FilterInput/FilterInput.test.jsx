import FilterInput from "./FilterInput";
import React from "react";
import { render, cleanup } from "@testing-library/react";

const handleChange = (event) => {};
const [name, value, icon] = ["blur", "20", "https://test.com/123.jpg"];

const mockFilterInput =
  '<input name="blur" type="range" min="0" max="100" data-testid="blur" value="20">';

describe("Filter Input Test", () => {
  afterEach(cleanup);

  it("create a snapshop", () => {
    expect(
      render(
        <FilterInput
          name={name}
          value={value}
          icon={icon}
          handleChange={handleChange}
        />
      )
    ).toMatchSnapshot();
  });

  it("should match the mock output", () => {
    const { getByTestId } = render(
      <FilterInput
        name={name}
        value={value}
        icon={icon}
        handleChange={handleChange}
      />
    );
    expect(getByTestId("blur").outerHTML).toEqual(mockFilterInput);
  });

  it("should match the image src", () => {
    const { getByRole } = render(
      <FilterInput
        name={name}
        value={value}
        icon={icon}
        handleChange={handleChange}
      />
    );
    expect(getByRole("img").src).toEqual("https://test.com/123.jpg");
  });
});
