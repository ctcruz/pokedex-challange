import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

type Pokemon = {
  name: string;
  url: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export const fetchPokemonList = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
}): Promise<ApiResponse> => {
  const res = await axios.get<ApiResponse>(pageParam);
  return res.data;
};

export async function fetchPokemonDetail(name: string) {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon detail");
  return res.json();
}

export async function fetchPokemonAbility(abilityId: number) {
  const res = await fetch(`${BASE_URL}/ability/${abilityId}/`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon ability");
  return res.json();
}

export async function fetchPokemonForm(formId: number) {
  const res = await fetch(`${BASE_URL}/pokemon-form/${formId}/`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon form");
  return res.json();
}

export async function fetchPokemonMove(moveId: number) {
  const res = await fetch(`${BASE_URL}/move/${moveId}/`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon move");
  return res.json();
}
