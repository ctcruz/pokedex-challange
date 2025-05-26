import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PokemonSelect } from "./PokemonSelect";
import { usePokemons } from "../../../application/hooks/usePokemons";
import { usePokemonData } from "../../context/PokemonContext";

// Mocks
jest.mock("../../../application/hooks/usePokemons");
jest.mock("../../context/PokemonContext");

const mockSetPokemonData = jest.fn();

describe("PokemonSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (usePokemonData as jest.Mock).mockReturnValue({
      setPokemonData: mockSetPokemonData,
    });

    (usePokemons as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
            ],
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
  });

  it("renders Autocomplete with initial options", () => {
    render(<PokemonSelect />);

    expect(screen.getByLabelText(/Select a Pokémon/i)).toBeInTheDocument();

    const autocomplete = screen.getByRole("combobox");
    expect(autocomplete).toBeInTheDocument();
  });

  it("selects an option and sets Pokemon data", async () => {
    render(<PokemonSelect />);

    const input = screen.getByRole("combobox");

    fireEvent.mouseDown(input);

    await waitFor(() => {
      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    });

    const pikachuOption = screen.getByText(/Pikachu/i);

    fireEvent.click(pikachuOption);

    await waitFor(() => {
      expect(mockSetPokemonData).toHaveBeenCalledWith({
        name: "pikachu",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        url: "https://pokeapi.co/api/v2/pokemon/25/",
      });
    });
  });
});
