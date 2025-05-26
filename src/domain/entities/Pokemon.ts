export interface PokemonDetail {
  name: string;
  abilities: any[];
  moves: any[];
  forms: any[];
}

export interface PokemonAbility {
  name: string;
  description: string;
}

export interface PokemonForm {
  name: string;
  imageSrc: string;
}

export interface PokemonMove {
  name: string;
  description: string;
}
