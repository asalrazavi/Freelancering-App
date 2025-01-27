import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChangeUserStatus from "./ChangeUserStatus";
import useChangeUserStatus from "./useChangeUserStatus";
import { describe, it, vi, beforeEach, expect } from "vitest";

// Mock useChangeUserStatus
vi.mock("./useChangeUserStatus", () => ({
  default: vi.fn(),
}));

const mockOnClose = vi.fn();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderComponent = (props) =>
  render(
    <QueryClientProvider client={queryClient}>
      <ChangeUserStatus {...props} />
    </QueryClientProvider>
  );

describe("ChangeUserStatus Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form with options and submit button", () => {
    useChangeUserStatus.mockReturnValue({
      changeUserStatus: vi.fn(),
      isPending: false,
    });

    renderComponent({ userId: "123", onClose: mockOnClose });

    console.log(screen.debug()); // Debug the rendered DOM

    // Use fallback selectors if necessary
    const selectElement = screen.getByRole("combobox"); // or screen.getByTestId("status-select")
    expect(selectElement).toBeInTheDocument();

    expect(screen.getByText("تایید")).toBeInTheDocument();
  });

  it("submits the form and calls changeUserStatus", async () => {
    const mockChangeUserStatus = vi.fn((_, options) => {
      options.onSuccess();
    });

    useChangeUserStatus.mockReturnValue({
      changeUserStatus: mockChangeUserStatus,
      isPending: false,
    });

    renderComponent({ userId: "123", onClose: mockOnClose });

    // Log the rendered DOM for debugging
    console.log(screen.debug());

    // Fallback to getByRole or getByTestId if getByLabelText doesn't work
    const selectElement = screen.getByRole("combobox"); // or screen.getByTestId("status-select")
    fireEvent.change(selectElement, { target: { value: "1" } });

    fireEvent.click(screen.getByText("تایید"));

    await waitFor(() => {
      expect(mockChangeUserStatus).toHaveBeenCalledWith(
        { userId: "123", data: { status: "1" } },
        expect.any(Object)
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("invalidates the users query on success", async () => {
    const mockChangeUserStatus = vi.fn((_, options) => {
      options.onSuccess();
    });

    const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");

    useChangeUserStatus.mockReturnValue({
      changeUserStatus: mockChangeUserStatus,
      isPending: false,
    });

    renderComponent({ userId: "123", onClose: mockOnClose });

    console.log(screen.debug()); // Debug the rendered DOM

    // Fallback for select targeting
    const selectElement = screen.getByRole("combobox"); // Or screen.getByTestId("status-select")
    fireEvent.change(selectElement, { target: { value: "1" } });

    fireEvent.click(screen.getByText("تایید"));

    await waitFor(() => {
      expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["users"] });
    });
  });
});
