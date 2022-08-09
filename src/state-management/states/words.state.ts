import { Blacklist } from "src/models/blacklist.model";
import { Word } from "src/models/word.model";

export interface IWordsState {
  word: Word;
  hasWord: boolean;
  allWords: Array<Word>;
  blacklists: Map<string, Blacklist>;
  languageIds: string[];
  loading: number;
}

export const initialWordsState: IWordsState = {
  word: {} as Word,
  hasWord: false,
  allWords: new Array<Word>(),
  blacklists: new Map<string, Blacklist>(),
  languageIds: [],
  loading: 0
};
