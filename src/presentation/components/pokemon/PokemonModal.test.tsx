import { render, screen, fireEvent } from "@testing-library/react";
import PokemonModal from "./PokemonModal";
import { usePokemonData } from "../../context/PokemonContext";
import { usePokemonDetail } from "../../../application/hooks/usePokemonDetail";

// Mock child components
jest.mock("./PokemonAvatar", () => ({
  PokemonAvatar: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="pokemon-avatar" />
  ),
}));

jest.mock("./PokemonDetails", () => ({
  PokemonDetails: ({ data }: { data: any }) => (
    <div data-testid="pokemon-details">{data.name}</div>
  ),
}));

jest.mock("../layout/Loader", () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

// Mock hooks
const setPokemonDataMock = jest.fn();

jest.mock("../../context/PokemonContext", () => ({
  usePokemonData: jest.fn(),
}));

jest.mock("../../../application/hooks/usePokemonDetail", () => ({
  usePokemonDetail: jest.fn(),
}));

describe("PokemonModal", () => {
  const mockPokemonData = {
    name: "pikachu",
    image: "https://example.com/pikachu.png",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };

  const mockDetailData = {
    name: "pikachu",
    height: 4,
    weight: 60,
    types: [{ type: { name: "electric" } }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePokemonData as jest.Mock).mockReturnValue({
      pokemonData: mockPokemonData,
      setPokemonData: setPokemonDataMock,
    });
    (usePokemonDetail as jest.Mock).mockReturnValue({
      data: mockDetailData,
      isLoading: false,
    });
  });

  it("calls setPokemonData(null) when close button is clicked", () => {
    render(<PokemonModal />);

    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);

    expect(setPokemonDataMock).toHaveBeenCalledWith(null);
  });

  it("shows loader when loading", () => {
    (usePokemonDetail as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<PokemonModal />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("does not render modal if no pokemon data", () => {
    (usePokemonData as jest.Mock).mockReturnValue({
      pokemonData: null,
      setPokemonData: setPokemonDataMock,
    });

    (usePokemonDetail as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<PokemonModal />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
