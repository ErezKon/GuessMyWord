import { createReducer, on } from "@ngrx/store";
import { initialWordsState, IWordsState } from "../states/words.state";

import * as WordsActions from '../actions/words.actions';
import { Word } from "src/models/word.model";
import { Action } from "rxjs/internal/scheduler/Action";

export const wordsreducer = createReducer(
  initialWordsState,
  on(WordsActions.getWord, (state: IWordsState) => ({ ...state, loading: state.loading + 1, word: initialWordsState.word })),
  on(WordsActions.getRandomWord, (state: IWordsState) => ({ ...state, word: initialWordsState.word })),
  on(WordsActions.getWordSuccess, (state: IWordsState, {word, dec}) => ({ ...state, loading: state.loading - dec, word: word  })),
  on(WordsActions.getWordFailure, (state: IWordsState) => ({ ...state, loading: state.loading - 1 })),

  on(WordsActions.getAllWords, (state: IWordsState) => ({ ...state, loading: state.loading + 1, allWords: initialWordsState.allWords })),
  on(WordsActions.getAllWordsSuccess, (state: IWordsState, {words}) => ({ ...state, loading: state.loading - 1, allWords: words  })),
  on(WordsActions.getAllWordsFailure, (state: IWordsState) => ({ ...state, loading: state.loading - 1 })),

  on(WordsActions.getBlacklist, (state: IWordsState) => ({ ...state, loading: state.loading + 1, blacklists: initialWordsState.blacklists })),
  on(WordsActions.getBlacklistSuccess, (state: IWordsState, {blacklist}) => ({ ...state, loading: state.loading - 1, blacklists: blacklist  })),
  on(WordsActions.getBlacklistFailure, (state: IWordsState) => ({ ...state, loading: state.loading - 1 })),

  on(WordsActions.getLanguagesIds, (state: IWordsState) => ({ ...state, loading: state.loading + 1, languageIds: initialWordsState.languageIds })),
  on(WordsActions.getLanguagesIdsSuccess, (state: IWordsState, {ids, dec}) => ({ ...state, loading: state.loading - dec, languageIds: ids  })),
  on(WordsActions.getLanguagesIdsFailure, (state: IWordsState) => ({ ...state, loading: state.loading - 1 })),


  on(WordsActions.resetLanguageIds, (state: IWordsState) => ({ ...state, languageIds: initialWordsState.languageIds})),
);
