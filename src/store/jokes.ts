import { defineStore } from 'pinia';
import { IJoke, IJokeList } from '@/types/jokes';

const useJokes = defineStore({
  id: 'jokes',
  state: (): IJokeList => {
    return {
      items: [],
    };
  },

  getters: {
    getJokes: (state) => state.items,
  },

  actions: {
    addJoke(item: IJoke): void {
      this.items.push(item);
    },
  },
});

export default useJokes;
