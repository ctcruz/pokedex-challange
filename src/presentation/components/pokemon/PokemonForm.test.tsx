import { render, screen } from "@testing-library/react";
import { PokemonForm } from "./PokemonForm";

// Mock do Loader e do PokemonAvatar
jest.mock("../layout/Loader", () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

jest.mock("./PokemonAvatar", () => ({
  PokemonAvatar: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="pokemon-avatar" src={src} alt={alt} />
  ),
}));

// Mock do hook usePokemonForm
jest.mock("../../../application/hooks/usePokemonForm", () => ({
  usePokemonForm: jest.fn(),
}));

import { usePokemonForm } from "../../../application/hooks/usePokemonForm";

describe("PokemonForm", () => {
  const mockFormId = 1;

  it("renders loader when not fetched", () => {
    (usePokemonForm as jest.Mock).mockReturnValue({
      data: null,
      isFetched: false,
      isError: false,
    });

    render(<PokemonForm formId={mockFormId} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders error message on error", () => {
    (usePokemonForm as jest.Mock).mockReturnValue({
      data: null,
      isFetched: true,
      isError: true,
    });

    render(<PokemonForm formId={mockFormId} />);

    expect(
      screen.getByText(/An error occurred while loading the Pokémon's form/i)
    ).toBeInTheDocument();
  });

  it("renders not found message when data is null", () => {
    (usePokemonForm as jest.Mock).mockReturnValue({
      data: null,
      isFetched: true,
      isError: false,
    });

    render(<PokemonForm formId={mockFormId} />);

    expect(screen.getByText(/Pokémon's forms not found!/i)).toBeInTheDocument();
  });

  it("renders PokemonAvatar and name when data is present", () => {
    const mockData = {
      name: "Pikachu",
      imageSrc: "https://example.com/pikachu.png",
    };

    (usePokemonForm as jest.Mock).mockReturnValue({
      data: mockData,
      isFetched: true,
      isError: false,
    });

    render(<PokemonForm formId={mockFormId} />);

    const avatar = screen.getByTestId("pokemon-avatar");
    expect(avatar).toHaveAttribute("src", mockData.imageSrc);
    expect(avatar).toHaveAttribute("alt", mockData.name);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
  });
});
