import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchPokemonDetail } from "../../infrastructure/api/PokeApiService";
import type { PokemonDetail } from "../../domain/entities/Pokemon";

export function usePokemonDetail(
  name: string,
  options?: Omit<
    UseQueryOptions<PokemonDetail, Error, PokemonDetail, [string, string]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetail(name),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
