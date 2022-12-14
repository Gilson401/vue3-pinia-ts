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
    getItems: (state) => [...state.items],
  },

  actions: {
    addPokemon(item: IPokemon): void {
      const newItem: IPokemon = { imageSrc: item.imageSrc, name: item.name, id: this.items.length };
      const list = [...this.items, newItem];
      this.items = list;
    },
  },
});

export default usePokemon;
