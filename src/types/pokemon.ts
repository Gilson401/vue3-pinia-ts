/* eslint-disable prettier/prettier */
export interface IPokemon {
  id?: number;
  name?: string | undefined;
  imageSrc?: string | undefined;
}

export interface IPokemonList {
    items: IPokemon[];    
}