import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import { logoutUser } from "../../application/services/AuthService";

// Mock child components to avoid their internal logic
jest.mock("../components/form/PokemonSelect", () => ({
  PokemonSelect: () => <div data-testid="pokemon-select">PokemonSelect</div>,
}));

jest.mock("../components/pokemon/PokemonModal", () => ({
  __esModule: true,
  default: () => <div data-testid="pokemon-modal">PokemonModal</div>,
}));

// Mock logoutUser
jest.mock("../../application/services/AuthService", () => ({
  logoutUser: jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logout button, PokemonSelect and PokemonModal", () => {
    render(<HomePage />);

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-select")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-modal")).toBeInTheDocument();
  });

  it("calls logoutUser when logout button is clicked", () => {
    render(<HomePage />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(logoutUser).toHaveBeenCalled();
  });
});
