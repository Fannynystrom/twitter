import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Note from "../components/NoteForm";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };


  render(<Note note={note} />);

  const element = screen.getByText("Create a new note");

  
  expect(element).toBeDefined();
});