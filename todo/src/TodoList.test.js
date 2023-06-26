import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", function() {
  render(<TodoList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

function addTodo(todoList) {
    const taskInput = todoList.getByLabelText("Task:");
    fireEvent.change(taskInput, { target: { value: "example task" }});
    const submitButton = todoList.getByText("Add todo!");
    fireEvent.click(submitButton);
}

it("can add task", function() {

    const list = render(<TodoList />);
    addTodo(list);
  
    // expect clear form and new task on page
    expect(list.getByLabelText("Task:")).toHaveValue("");
    expect(list.getByText("example task")).toBeInTheDocument();
    expect(list.getByText("Edit")).toBeInTheDocument();
    expect(list.getByText("X")).toBeInTheDocument();
});

it("can edit task", function() {

    const list = render(<TodoList />);
    addTodo(list);
  
    fireEvent.click(list.getByText("Edit"));
    const editInput = list.getByDisplayValue("example task");
    fireEvent.change(editInput, { target: { value: "newtask" }});
    fireEvent.click(list.getByText("Update"));
  
    // expect edited task to appear and not old one
    expect(list.getByText("newtask")).toBeInTheDocument();
    expect(list.queryByText("exampletask")).not.toBeInTheDocument();
});

it("can delete task", function() {

    const list = render(<TodoList />);
    addTodo(list);
  
    fireEvent.click(list.getByText("X"));
  
    // expect no task
    expect(list.queryByText("example task")).not.toBeInTheDocument();
});