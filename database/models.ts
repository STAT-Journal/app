export interface Element {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  text: string;
}

export interface Entry {
  ID: number;
  Snapshot_URI: string;
  Elements_JSON: Element[];
}

export interface AppUser {
  Username: string;
  Streak: number;
  CurrencyAmount: number;
  InventoryOfItems: InventoryItem[];
}

export interface InventoryItem {
  id: number;
  name: string;
  cost: number;
  icon: string;
}

export interface ItemJSON {
  items: InventoryItem[];
}
