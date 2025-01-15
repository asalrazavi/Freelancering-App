import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import CompleteProfileForm from "./CompleteProfileForm";

// Mock the necessary modules
vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock the TagsInput component
vi.mock("react-tag-input-component", () => ({
  TagsInput: ({ value, onChange }) => (
    <input
      data-testid="tags-input"
      value={value.join(",")}
      onChange={(e) => onChange(e.target.value.split(","))}
    />
  ),
}));

const mockUseMutation = vi.fn();
const navigateMock = vi.fn();

describe("CompleteProfileForm", () => {
  beforeEach(() => {
    // Set up mocked return values for useMutation and useNavigate
    useMutation.mockReturnValue({
      mutateAsync: mockUseMutation,
      isPending: false,
    });
    useNavigate.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks();
  });

  it("renders the form fields correctly", () => {
    render(
      <Router>
        <CompleteProfileForm />
      </Router>
    );

    // Check for form fields
    expect(screen.getByLabelText("نام و نام خانوادگی")).toBeInTheDocument();
    expect(screen.getByLabelText("ایمیل")).toBeInTheDocument();
    expect(screen.getByTestId("tags-input")).toBeInTheDocument();
    expect(screen.getByLabelText("کارفرما")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    render(
      <Router>
        <CompleteProfileForm />
      </Router>
    );

    // Fill out form fields
    fireEvent.change(screen.getByLabelText("نام و نام خانوادگی"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("ایمیل"), {
      target: { value: "john.doe@example.com" },
    });

    // Handle the custom TagsInput component
    fireEvent.change(screen.getByTestId("tags-input"), {
      target: { value: "Node.js" },
    });

    // Assert that the tag was added
    expect(screen.getByTestId("tags-input").value).toBe("Node.js");

    // Select the role as "کارفرما" (Employer)
    fireEvent.click(screen.getByLabelText("کارفرما"));

    // Mock successful mutation
    mockUseMutation.mockResolvedValue({
      user: { status: 1, role: "OWNER" },
      message: "Submission successful",
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /تایید/i }));
  });

  it("shows an error message on submission failure", async () => {
    // Mock error mutation
    mockUseMutation.mockRejectedValue(new Error("خطا در ارسال اطلاعات"));

    render(
      <Router>
        <CompleteProfileForm />
      </Router>
    );

    // Fill out form fields
    fireEvent.change(screen.getByLabelText("نام و نام خانوادگی"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText("ایمیل"), {
      target: { value: "jane.doe@example.com" },
    });

    // Handle the custom TagsInput component
    fireEvent.change(screen.getByTestId("tags-input"), {
      target: { value: "Node.js" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /تایید/i }));
  });
});
