import React, { useMemo, useState, useRef } from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";
import { debounce } from "lodash";
import { PokemonAvatar } from "../pokemon/PokemonAvatar";
import { usePokemons } from "../../../application/hooks/usePokemons";
import { usePokemonData } from "../../context/PokemonContext";

type Pokemon = {
  name: string;
  url: string;
};

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const getPokemonId = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
};

const getPokemonImage = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const PokemonSelect: React.FC = () => {
  const { setPokemonData } = usePokemonData();
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<Pokemon | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemons();

  const allPokemons = data?.pages.flatMap((page) => page.results) || [];

  const filteredPokemons = useMemo(() => {
    if (!search) return allPokemons;
    return allPokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allPokemons]);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    []
  );

  const listboxRef = useRef<HTMLUListElement>(null);

  const handleListboxScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const listboxNode = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = listboxNode;

    if (scrollTop + clientHeight >= scrollHeight * 0.9) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <>
      <Autocomplete
        options={filteredPokemons}
        getOptionLabel={(option) => option.name}
        value={selected}
        onChange={(_, newValue) => setSelected(newValue)}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a Pokémon"
            placeholder="Select a Pokémon"
            variant="outlined"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        )}
        renderOption={(props, option) => {
          const id = getPokemonId(option.url);
          const pokemonImage = getPokemonImage(id);
          return (
            <Box
              {...props}
              key={`pokemon-${id}`}
              component="li"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
              onClick={() => {
                setPokemonData({
                  name: option.name,
                  image: pokemonImage,
                  url: option.url,
                });
              }}
            >
              <PokemonAvatar src={pokemonImage} alt={option.name} size={40} />
              <Typography>{capitalizeFirstLetter(option.name)}</Typography>
            </Box>
          );
        }}
        ListboxProps={{
          ref: listboxRef,
          onScroll: handleListboxScroll,
        }}
        loading={isFetchingNextPage}
        loadingText="Loading more Pokémon..."
        sx={{ width: 500 }}
      />
    </>
  );
};
