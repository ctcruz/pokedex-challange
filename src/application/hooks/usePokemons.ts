import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../../infrastructure/api/PokeApiService";

export function usePokemons() {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    initialPageParam: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
    queryFn: ({ pageParam }) => fetchPokemonList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.next,
    staleTime: 1000 * 60 * 5,
  });
}
