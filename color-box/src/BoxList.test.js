import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", function() {
  render(<BoxList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

function addBox(boxList) {
    const heightInput = boxList.getByLabelText("Height");
    const widthInput = boxList.getByLabelText("Width");
    const backgroundInput = boxList.getByLabelText("Background Color");
    fireEvent.change(backgroundInput, { target: { value: "black" } });
    fireEvent.change(widthInput, { target: { value: 5 } });
    fireEvent.change(heightInput, { target: { value: 5 } });
    const button = boxList.getByText("Add new box!");
    fireEvent.click(button);
}

it("can add a new box", function () {
    const boxList = render(<BoxList />);

    // add a box
    addBox(boxList);

    // expect empty form
    expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
    // expect a box
    const removeButton = boxList.getByText("X");
    expect(removeButton).toBeInTheDocument();
    expect(removeButton.parentElement).toHaveStyle(`
    width: 5rem;
    height: 5rem;
    background-color: black;
    `)
});

it("can remove a box", function () {
    const boxList = render(<BoxList />);

    // add a box
    addBox(boxList);

    const removeButton = boxList.getByText("X");
    // remove box via removeButton
    fireEvent.click(removeButton);
    expect(removeButton).not.toBeInTheDocument();
})