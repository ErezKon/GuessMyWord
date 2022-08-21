import { WordMetadata } from "./word-metadata.model";

export interface Word {
  id: number;
  guid: string;
  word: string;
  language: string;
  description: string;
  solved: WordMetadata[];
}

export const emptyWord: Word = {
  id: -1,
  guid: '',
  word: '',
  language: '',
  description: '',
  solved: []
};
