import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import Filter from "./Filter";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("Filter Component", () => {
  const mockSetSearchParams = vi.fn();
  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    useSearchParams.mockReturnValue([
      new URLSearchParams("filter=all"),
      mockSetSearchParams,
    ]);
  });

  it("renders correctly with options", () => {
    render(
      <MemoryRouter>
        <Filter filterField="filter" options={options} />
      </MemoryRouter>
    );

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("disables the active filter button", () => {
    render(
      <MemoryRouter>
        <Filter filterField="filter" options={options} />
      </MemoryRouter>
    );

    const activeButton = screen.getByText("All");
    expect(activeButton).toBeDisabled();
  });

  it("updates the filter when a button is clicked", () => {
    render(
      <MemoryRouter>
        <Filter filterField="filter" options={options} />
      </MemoryRouter>
    );

    const activeButton = screen.getByText("Active");
    fireEvent.click(activeButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams("filter=active")
    );
  });

  it("applies the correct styling for the active filter", () => {
    render(
      <MemoryRouter>
        <Filter filterField="filter" options={options} />
      </MemoryRouter>
    );

    const activeButton = screen.getByText("All");
    expect(activeButton).toHaveClass("!bg-primary-900");
    expect(activeButton).toHaveClass("text-white");
  });
});
