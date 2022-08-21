import { createReducer, on } from "@ngrx/store";
import { initialWordsState, IWordsState } from "../states/words.state";

import * as WordsActions from '../actions/words.actions';

export const wordsreducer = createReducer(
  initialWordsState,
  on(WordsActions.getWord, (state: IWordsState) => ({ ...state, wordLoading: true, word: initialWordsState.word })),
  on(WordsActions.getRandomWord, (state: IWordsState) => ({ ...state, wordLoading: true, word: initialWordsState.word })),
  on(WordsActions.getWordSuccess, (state: IWordsState, {word}) => ({ ...state, wordLoading: false, word: word  })),
  on(WordsActions.getWordFailure, (state: IWordsState) => ({ ...state, wordLoading: false })),
);
