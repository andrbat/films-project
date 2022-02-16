import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("renders not authorization bottons", () => {
  const expectedButtons = ["Home", "Films", "Login"];
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement: any = screen
    .queryAllByRole("tab", { hidden: false })
    .map((e) => e.textContent);
  expect(linkElement).toEqual(expectedButtons);
});
