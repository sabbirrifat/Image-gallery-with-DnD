import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CanvasCard from './CanvasCard';

const mockCard = {
  char_id: 233,
  img: "https://test.com/123.jpg",
};

describe("Canvas Card Test", () => {
  afterEach(cleanup);

  it("create a snapshot", () => {
      expect(render(
        <DndProvider backend={HTML5Backend}>
          <CanvasCard
            card={mockCard}
          />
        </DndProvider>
      )).toMatchSnapshot()
  })

  it("should appear setting when hover", () => {
    const {getByTestId} = render(
      <DndProvider backend={HTML5Backend}>
        <CanvasCard
          card={mockCard}
        />
      </DndProvider>
    );
    const card = getByTestId("canvas-card");
    fireEvent.mouseEnter(card);
    expect(getByTestId("image-options")).toBeTruthy()
  });

  it("should match the image src", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <CanvasCard card={mockCard} />
      </DndProvider>
    );
    expect(screen.getByRole("img").src).toEqual("https://test.com/123.jpg");
  });
  
});
