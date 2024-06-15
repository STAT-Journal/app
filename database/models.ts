export interface TextElement {
  x: number;
  y: number;
  text: string;
}

export interface ImageElement {
  x: number;
  y: number;
  file_location: string;
}

export interface ElementsJSON {
  text_elements: TextElement[];
  image_elements: ImageElement[];
}

export interface Entry {
  ID?: number;
  Elements_JSON: ElementsJSON;
}

export interface AppUser {
  Username: string;
  Streak: number;
  CurrencyAmount: number;
  InventoryOfItems: InventoryItem[];
}

export interface InventoryItem {
  name: string;
  cost: number;
  image: string;
}

export interface ItemJSON {
  items: InventoryItem[];
}
