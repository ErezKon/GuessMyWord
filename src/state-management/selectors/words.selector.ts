import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { IWordsState } from '../states/words.state';

export const selectWordsState = (state: IAppState) => state.words;

export const selectWord = createSelector(
  selectWordsState,
  (state: IWordsState) => state.word
);

export const selectLoading = createSelector(
  selectWordsState,
  (state: IWordsState) => state.wordLoading
);

export const selectHasWord = createSelector(
  selectWordsState,
  (state: IWordsState) => state.word?.id !== -1
);
