import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { PokemonMove } from "../../domain/entities/Pokemon";
import { fetchPokemonMove } from "../../infrastructure/api/PokeApiService";
import { capitalizeFirstLetter } from "../../shared/helpers/capitalize";

export interface GetPokemonMove {
  name: string;
  effect_entries: {
    short_effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

const mapToPokemonMove = (data: GetPokemonMove): PokemonMove => {
  const description =
    data.effect_entries
      ?.filter((entry) => entry.language.name === "en")
      ?.map((entry) => entry.short_effect.trim())
      .join(" ") || "";

  return {
    name: capitalizeFirstLetter(data?.name),
    description,
  };
};

export function usePokemonMove(
  moveId: number,
  options?: Omit<
    UseQueryOptions<GetPokemonMove, Error, PokemonMove, [string, string]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["pokemonMove", `move-${moveId}`],
    queryFn: () => fetchPokemonMove(moveId),
    select: (data) => mapToPokemonMove(data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
