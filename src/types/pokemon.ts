/* eslint-disable prettier/prettier */
export interface IPokemon {
  name?: string | undefined;
  imageSrc?: string | undefined;
}

export interface IPokemonList {
    items: IPokemon[];    
}