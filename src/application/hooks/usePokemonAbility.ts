import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchPokemonAbility } from "../../infrastructure/api/PokeApiService";
import type { PokemonAbility } from "../../domain/entities/Pokemon";
import { capitalizeFirstLetter } from "../../shared/helpers/capitalize";

export interface GetPokemonAbility {
  name: string;
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

const mapToPokemonAbility = (data: GetPokemonAbility): PokemonAbility => {
  const description =
    data.effect_entries
      ?.filter((entry) => entry.language.name === "en")
      ?.map((entry) => entry.effect.trim())
      .join(" ") || "";

  return {
    name: capitalizeFirstLetter(data?.name),
    description,
  };
};

export function usePokemonAbility(
  abilityId: number,
  options?: Omit<
    UseQueryOptions<GetPokemonAbility, Error, PokemonAbility, [string, string]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["pokemonAbility", `ability-${abilityId}`],
    queryFn: () => fetchPokemonAbility(abilityId),
    select: (data) => mapToPokemonAbility(data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
