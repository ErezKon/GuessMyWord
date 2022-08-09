import { RouterReducerState } from '@ngrx/router-store';
import { initialWordsState, IWordsState } from './words.state';

export interface IAppState {
  router?: RouterReducerState;
  words: IWordsState
}

export const initialAppState: IAppState = {
  words: initialWordsState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
