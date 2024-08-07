import { Style } from "@dicebear/core"

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
  CreatedAt: number;
}

export interface TextEntry {
  ID: number;
  Entry: string;
  CreatedAt: string;
}

export interface AppProfile {
  AvatarSVG: string;
  Username: string;
}

export interface AppUser {
  Streak: number;
  CurrencyAmount: number;
  LastEntry: number;
  InventoryOfItems:Array<ItemAndCount>;
}
export interface InventoryItem {
  id: number;
  name: string;
  cost: number;
  icon: string;
}

export interface ItemAndCount{
  item: InventoryItem;
  count: number ;
}