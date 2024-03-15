// types.ts

export interface Item {
    id: number;
    content: string;
    cardId: number; // Add cardId property
  }
  
  export interface Card {
    id: number;
    items: Item[];
  }
  