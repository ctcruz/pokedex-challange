import { render, screen } from "@testing-library/react";
import { PokemonMove } from "./PokemonMove";

// Mock do Loader
jest.mock("../layout/Loader", () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

// Mock do hook usePokemonMove
jest.mock("../../../application/hooks/usePokemonMove", () => ({
  usePokemonMove: jest.fn(),
}));

import { usePokemonMove } from "../../../application/hooks/usePokemonMove";

describe("PokemonMove", () => {
  const mockMoveId = 1;

  it("renders loader when isLoading is true", () => {
    (usePokemonMove as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<PokemonMove moveId={mockMoveId} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders error message when isError is true", () => {
    (usePokemonMove as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<PokemonMove moveId={mockMoveId} />);

    expect(
      screen.getByText(/An error occurred while loading the Pokémon's move/i)
    ).toBeInTheDocument();
  });

  it("renders not found message when data is null", () => {
    (usePokemonMove as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<PokemonMove moveId={mockMoveId} />);

    expect(screen.getByText(/Pokémon's moves not found!/i)).toBeInTheDocument();
  });

  it("renders move name and description when data is available", () => {
    const mockData = {
      name: "Thunderbolt",
      description: "A strong electric attack.",
    };

    (usePokemonMove as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<PokemonMove moveId={mockMoveId} />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
  });
});
