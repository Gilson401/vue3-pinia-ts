import { defineStore } from 'pinia';
import { IPokemon, IPokemonList } from '@/types/pokemon';

const usePokemon = defineStore({
  id: 'pokemons',
  state: (): IPokemonList => {
    return {
      items: [],
    };
  },

  getters: {
    getItems: (state) => state.items,
  },

  actions: {
    addPokemon(item: IPokemon): void {
      this.items.push(item);
    },
  },
});

export default usePokemon;
