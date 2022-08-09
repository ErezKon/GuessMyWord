import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { IWordsState } from '../states/words.state';

export const selectWordsState = (state: IAppState) => state.words;

export const selectWord = createSelector(
  selectWordsState,
  (state: IWordsState) => state.word
);

export const selectAllWords = createSelector(
  selectWordsState,
  (state: IWordsState) => state.allWords
);

export const selectBlacklist = createSelector(
  selectWordsState,
  (state: IWordsState) => state.blacklists
);

export const selectLanguageIds = createSelector(
  selectWordsState,
  (state: IWordsState) => state.languageIds
);

export const selectLoading = createSelector(
  selectWordsState,
  (state: IWordsState) => state.loading > 0
);

export const selectHasWord = createSelector(
  selectWordsState,
  (state: IWordsState) => state.word?.id !== '-1'
);
