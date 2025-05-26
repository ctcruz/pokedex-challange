import { createContext, useContext, useState, type ReactNode } from "react";

type PokemonData = {
  name: string;
  image: string;
  url: string;
};

type PokemonContextType = {
  pokemonData: PokemonData | null;
  setPokemonData: (data: PokemonData | null) => void;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  return (
    <PokemonContext.Provider value={{ pokemonData, setPokemonData }}>
      {children}
    </PokemonContext.Provider>
  );
};

export function usePokemonData() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonData must be used within a PokemonProvider");
  }
  return context;
}
