import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { PokemonForm } from "../../domain/entities/Pokemon";
import { fetchPokemonForm } from "../../infrastructure/api/PokeApiService";
import { capitalizeFirstLetter } from "../../shared/helpers/capitalize";

export interface GetPokemonForm {
  name: string;
  sprites?: {
    front_default: string;
  };
}

const mapToPokemonForm = (data: GetPokemonForm): PokemonForm => {
  return {
    name: capitalizeFirstLetter(data?.name),
    imageSrc: data?.sprites?.front_default || "",
  };
};

export function usePokemonForm(
  formId: number,
  options?: Omit<
    UseQueryOptions<GetPokemonForm, Error, PokemonForm, [string, string]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["pokemonForm", `form-${formId}`],
    queryFn: () => fetchPokemonForm(formId),
    select: (data) => mapToPokemonForm(data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
