import { Blacklist } from "src/models/blacklist.model";
import { emptyWord, Word } from "src/models/word.model";

export interface IWordsState {
  word: Word;
  hasWord: boolean;
  wordLoading: boolean;
}

export const initialWordsState: IWordsState = {
  word: emptyWord,
  hasWord: false,
  wordLoading: false
};
