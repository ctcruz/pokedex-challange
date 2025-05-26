import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonDetails } from "./PokemonDetails";

// Mocks
jest.mock("./PokemonAbility", () => ({
  PokemonAbility: ({ abilityId }: { abilityId: number }) => (
    <div data-testid={`ability-${abilityId}`}>Ability {abilityId}</div>
  ),
}));

jest.mock("./PokemonMove", () => ({
  PokemonMove: ({ moveId }: { moveId: number }) => (
    <div data-testid={`move-${moveId}`}>Move {moveId}</div>
  ),
}));

jest.mock("./PokemonForm", () => ({
  PokemonForm: ({ formId }: { formId: number }) => (
    <div data-testid={`form-${formId}`}>Form {formId}</div>
  ),
}));

describe("PokemonDetails", () => {
  const mockData = {
    abilities: [
      {
        ability: { url: "https://pokeapi.co/api/v2/ability/1/" },
        is_hidden: false,
      },
      {
        ability: { url: "https://pokeapi.co/api/v2/ability/2/" },
        is_hidden: true,
      }, // Should be ignored
    ],
    forms: [
      { url: "https://pokeapi.co/api/v2/form/10/" },
      { url: "https://pokeapi.co/api/v2/form/20/" },
    ],
    moves: [
      { move: { url: "https://pokeapi.co/api/v2/move/100/" } },
      { move: { url: "https://pokeapi.co/api/v2/move/200/" } },
    ],
  };

  it("renders abilities tab with visible abilities only", () => {
    render(<PokemonDetails data={mockData} />);

    // Ability 1 should be present, ability 2 is hidden
    expect(screen.getByTestId("ability-1")).toBeInTheDocument();
    expect(screen.queryByTestId("ability-2")).toBeNull();
  });

  it("switches to moves tab and displays moves", () => {
    render(<PokemonDetails data={mockData} />);

    // Switch to Moves tab
    fireEvent.click(screen.getByText(/Moves/i));

    expect(screen.getByTestId("move-100")).toBeInTheDocument();
    expect(screen.getByTestId("move-200")).toBeInTheDocument();
  });

  it("switches to forms tab and displays forms", () => {
    render(<PokemonDetails data={mockData} />);

    // Switch to Forms tab
    fireEvent.click(screen.getByText(/Forms/i));

    expect(screen.getByTestId("form-10")).toBeInTheDocument();
    expect(screen.getByTestId("form-20")).toBeInTheDocument();
  });

  it("renders nothing if data is null", () => {
    render(<PokemonDetails data={null} />);

    // No abilities
    expect(screen.queryByTestId(/ability-/i)).toBeNull();

    // No moves
    fireEvent.click(screen.getByText(/Moves/i));
    expect(screen.queryByTestId(/move-/i)).toBeNull();

    // No forms
    fireEvent.click(screen.getByText(/Forms/i));
    expect(screen.queryByTestId(/form-/i)).toBeNull();
  });
});
