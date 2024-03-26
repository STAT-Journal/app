export interface Entry {
  id: number;
  title: string;
  date: Date;
}

export interface Text {
  id: number;
  text: string;

}

enum MediaType {
  jpeg = 'jpeg',
  mp4 = 'mp4',
}

export interface VisualMedia {
  id: number;
  type: MediaType;
  blob: Uint8Array
}

export interface EntryWithMedia extends Entry {
  mediaId: number;
}