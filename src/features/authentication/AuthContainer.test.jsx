import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useMutation } from "@tanstack/react-query";
import AuthContainer from "./AuthContainer";
import toast from "react-hot-toast";

// Mock dependencies
vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("./SendOTPForm", () => ({
  default: ({ onSubmit, register }) => (
    <form onSubmit={onSubmit} data-testid="send-otp-form">
      <input
        data-testid="phone-input"
        {...register("phoneNumber")}
        placeholder="Enter phone number"
      />
      <button type="submit">Send OTP</button>
    </form>
  ),
}));

vi.mock("./CheckOTPForm", () => ({
  default: ({ onBack, onReSendOtp }) => (
    <div data-testid="check-otp-form">
      <button onClick={onBack}>Back</button>
      <button onClick={onReSendOtp}>Resend OTP</button>
    </div>
  ),
}));

describe("AuthContainer", () => {
  const mockMutateAsync = vi.fn();

  beforeEach(() => {
    useMutation.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders SendOTPForm initially", () => {
    render(<AuthContainer />);
    expect(screen.getByTestId("send-otp-form")).toBeInTheDocument();
  });

  test("switches to CheckOTPForm after sending OTP successfully", async () => {
    mockMutateAsync.mockResolvedValue({ message: "OTP sent successfully" });

    render(<AuthContainer />);

    const phoneInput = screen.getByTestId("phone-input");
    const sendButton = screen.getByText("Send OTP");

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        phoneNumber: "1234567890",
      });
    });

    expect(toast.success).toHaveBeenCalledWith("OTP sent successfully");
    expect(screen.getByTestId("check-otp-form")).toBeInTheDocument();
  });

  test("displays an error toast on OTP request failure", async () => {
    mockMutateAsync.mockRejectedValue({
      response: { data: { message: "Failed to send OTP" } },
    });

    render(<AuthContainer />);

    const phoneInput = screen.getByTestId("phone-input");
    const sendButton = screen.getByText("Send OTP");

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        phoneNumber: "1234567890",
      });
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to send OTP");
    expect(screen.getByTestId("send-otp-form")).toBeInTheDocument();
  });
});
