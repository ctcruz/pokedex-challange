import { render, screen } from "@testing-library/react";
import { PokemonAbility } from "./PokemonAbility";
import { usePokemonAbility } from "../../../application/hooks/usePokemonAbility";

// Mock Loader
jest.mock("../layout/Loader", () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

// Mock usePokemonAbility
jest.mock("../../../application/hooks/usePokemonAbility", () => ({
  usePokemonAbility: jest.fn(),
}));

describe("PokemonAbility", () => {
  const mockAbilityData = {
    name: "overgrow",
    description: "Powers up Grass-type moves when the Pokémon is in trouble.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loader when loading", () => {
    (usePokemonAbility as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<PokemonAbility abilityId={1} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    (usePokemonAbility as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<PokemonAbility abilityId={1} />);

    expect(
      screen.getByText(
        /an error occurred while loading the Pokémon's abilities/i
      )
    ).toBeInTheDocument();
  });

  it("renders not found message when data is null", () => {
    (usePokemonAbility as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<PokemonAbility abilityId={1} />);

    expect(
      screen.getByText(/Pokémon's abilities not found!/i)
    ).toBeInTheDocument();
  });

  it("renders ability name and description when data is present", () => {
    (usePokemonAbility as jest.Mock).mockReturnValue({
      data: mockAbilityData,
      isLoading: false,
      isError: false,
    });

    render(<PokemonAbility abilityId={1} />);

    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Powers up Grass-type moves when the Pokémon is in trouble./i
      )
    ).toBeInTheDocument();
  });
});
