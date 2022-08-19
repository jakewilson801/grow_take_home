import React from "react";
import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
describe("Testing", () => {
  test("Renders a list of data from wikimedia", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("ARTICLES")).toBeInTheDocument();
    });
  });

  test("Renders the correct number of elements", async () => {
    render(<App />);
    await waitFor(() => {
      const { children } = screen.getByTestId("ARTICLES");
      expect(children.length).toBe(100);
    });
  });

  test("Renders the correct number of elements when changing option", async () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("PAGE_SIZE"), {
      target: { value: 50 },
    });
    await waitFor(() => {
      const { children } = screen.getByTestId("ARTICLES");
      expect(children.length).toBe(50);
    });
  });

  test("Pins a article correctly", async () => {
    render(<App />);
    await waitFor(() => {
      const articles = screen.getByTestId("ARTICLES");
      expect(articles).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("ARTICLE0"));
    await waitFor(() => {
      const articles = screen.getByTestId("PINNED_ARTICLES");
      expect(articles).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("PINNED_ARTICLE0"));
    await waitFor(() => {
      let error;
      try {
        screen.getByTestId("PINNED_ARTICLES");
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
    });
  });
});
