import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MediaCard from "./MediaCard";

const mockCard = {
  char_id: 233,
  img: "https://test.com/123.jpg",
};

let mockReplaceImageTarget = null;

const mockUpdateMediaStatus = (card) => {
  mockReplaceImageTarget = card;
};

describe("Media Card Test", () => {
  afterEach(cleanup);

  it("create a snapshot", () => {
    expect(
      render(
        <DndProvider backend={HTML5Backend}>
          <MediaCard card={mockCard} isCardSelected={false} />
        </DndProvider>
      )
    ).toMatchSnapshot();
  });

  it("should match the image src", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <MediaCard card={mockCard} isCardSelected={false} />
      </DndProvider>
    );
    expect(screen.getByRole("img").src).toEqual("https://test.com/123.jpg");
  });

  it("when the card selected but replace target image not match", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <MediaCard
          card={mockCard}
          isCardSelected={true}
          updateMediaStatus={mockUpdateMediaStatus}
          replaceImageTarget={null}
        />
      </DndProvider>
    );
    expect(screen.getByTestId("image-card").className).not.toEqual(
      "image-card selected"
    );
  });

  it("should fire mockUpdateMediaStatus", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <MediaCard
          card={mockCard}
          isCardSelected={true}
          updateMediaStatus={mockUpdateMediaStatus}
          replaceImageTarget={mockReplaceImageTarget}
        />
      </DndProvider>
    );
    const image = screen.getByRole("img");
    fireEvent.click(image);
    expect(mockReplaceImageTarget).not.toBe(null);
  });

  it("when replace image selected className should change", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <MediaCard
          card={mockCard}
          isCardSelected={true}
          updateMediaStatus={mockUpdateMediaStatus}
          replaceImageTarget={mockReplaceImageTarget}
        />
      </DndProvider>
    );
    expect(screen.getByTestId("image-card").className).toEqual(
      "image-card selected"
    );
  });
});
