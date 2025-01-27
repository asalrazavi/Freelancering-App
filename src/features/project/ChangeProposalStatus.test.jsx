import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import ChangeProposalStatus from "./ChangeProposalStatus";
import useChangeProposalStatus from "./useChangeProposalStatus";
import { describe, expect, it, vi } from "vitest";

// Mock the `useChangeProposalStatus` hook
vi.mock("./useChangeProposalStatus");

// Create a mock QueryClient
const queryClient = new QueryClient();

const renderComponent = (props) =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChangeProposalStatus {...props} />
      </BrowserRouter>
    </QueryClientProvider>
  );

describe("ChangeProposalStatus Component", () => {
  const mockOnClose = vi.fn();

  it("renders the form with the dropdown and submit button", () => {
    useChangeProposalStatus.mockReturnValue({
      changeProposalStatus: vi.fn(),
      isUpdating: false,
    });

    renderComponent({ proposalId: "123", onClose: mockOnClose });

    // Use getByText for non-standard label implementation
    expect(screen.getByText("تغییر وضعیت")).toBeInTheDocument();
    expect(screen.getByText("تایید")).toBeInTheDocument();
  });

  it("submits the form with selected data and calls changeProposalStatus", async () => {
    const mockChangeProposalStatus = vi.fn();
    useChangeProposalStatus.mockReturnValue({
      changeProposalStatus: mockChangeProposalStatus,
      isUpdating: false,
    });

    renderComponent({ proposalId: "123", onClose: mockOnClose });

    // Select the dropdown using getByText instead of getByLabelText
    fireEvent.change(screen.getByText("تغییر وضعیت").nextSibling, {
      target: { value: "1" }, // Assuming "1" corresponds to "در انتظار تایید"
    });

    fireEvent.click(screen.getByText("تایید"));

    await waitFor(() => {
      expect(mockChangeProposalStatus).toHaveBeenCalledWith(
        { proposalId: "123", projectId: undefined, status: "1" },
        expect.any(Object) // `onSuccess` callback
      );
    });
  });

  it("invalidates the query after a successful submission", async () => {
    const mockChangeProposalStatus = vi.fn((_, options) => {
      options.onSuccess();
    });

    const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");

    useChangeProposalStatus.mockReturnValue({
      changeProposalStatus: mockChangeProposalStatus,
      isUpdating: false,
    });

    renderComponent({ proposalId: "123", onClose: mockOnClose });

    // Locate the dropdown by text instead of label
    fireEvent.change(screen.getByText("تغییر وضعیت").nextSibling, {
      target: { value: "1" }, // Adjust based on the value of "در انتظار تایید"
    });

    // Click the submit button
    fireEvent.click(screen.getByText("تایید"));

    await waitFor(() => {
      expect(invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["project", undefined], // Adjust the `projectId` if necessary
      });
    });
  });
});
