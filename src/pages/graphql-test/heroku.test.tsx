import React from "react";
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import Heroku from "./heroku";
import { GET_FOOD } from "../../graphql";

const mocks = [
  {
    request: { query: GET_FOOD, variables: { id: 167512 } },
    result: {
      data: {
        food: {
          id: 167512,
          description: "yummy food",
          brand: "nice",
        },
      },
    },
  },
];

test("loads and displays greeting", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Heroku />
    </MockedProvider>
  );

  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Heroku");

  fireEvent.click(screen.getByText("Hello world"));

  await waitFor(() => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  await waitFor(() => {
    expect(screen.getByText("yummy food")).toBeInTheDocument();
  });
});
