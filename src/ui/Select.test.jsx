import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const mockOnChange = vi.fn();

  it("renders correctly with given options", () => {
    render(
      <Select options={options} onChange={mockOnChange} value="option1" />
    );

    // Check if select element is present
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // Verify all options are rendered
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("sets the correct default value", () => {
    render(
      <Select options={options} onChange={mockOnChange} value="option2" />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("option2");
  });

  it("calls onChange with the correct value when an option is selected", () => {
    render(
      <Select options={options} onChange={mockOnChange} value="option1" />
    );

    const select = screen.getByRole("combobox");

    // Simulate changing the selection
    fireEvent.change(select, { target: { value: "option3" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object)); // Ensure the event is passed
  });

  it("applies correct styling to the select element", () => {
    render(
      <Select options={options} onChange={mockOnChange} value="option1" />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("textField__dropdown");
    expect(select).toHaveClass("py-2");
    expect(select).toHaveClass("text-xs");
    expect(select).toHaveClass("bg-secondary-0");
  });
});
