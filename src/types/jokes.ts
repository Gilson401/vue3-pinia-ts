/* eslint-disable prettier/prettier */
export interface IJoke {
    joke?: string | undefined;
    id?: number;
  }
  
  export interface IJokeList {
      items: IJoke[];    
  }