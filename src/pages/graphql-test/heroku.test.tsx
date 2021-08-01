import React from "react";
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Heroku from "./heroku";

test("loads and displays greeting", async () => {
  render(<Heroku />);

  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Heroku");

  fireEvent.click(screen.getByText("Hello world"));

  await waitFor(() => {
    expect(screen.getByText("yummy food")).toBeInTheDocument();
  });
});
