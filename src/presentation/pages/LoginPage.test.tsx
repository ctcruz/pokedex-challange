import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { MemoryRouter } from "react-router-dom";

// Mocks
jest.mock("../../application/services/AuthService", () => ({
  checkAuth: jest.fn(),
  loginUser: jest.fn(),
}));

import { checkAuth, loginUser } from "../../application/services/AuthService";

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login form", () => {
    (checkAuth as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login PokeAPP/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it('should navigate to "/" if already authenticated', () => {
    (checkAuth as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should show error message on invalid credentials", async () => {
    (checkAuth as jest.Mock).mockReturnValue(false);
    (loginUser as jest.Mock).mockResolvedValue(false);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should navigate to "/" on successful login', async () => {
    (checkAuth as jest.Mock).mockReturnValue(false);
    (loginUser as jest.Mock).mockResolvedValue(true);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "correctuser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "correctpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
