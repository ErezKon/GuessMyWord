import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../states/app.state";
import { wordsreducer } from "./words.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  words: wordsreducer
};
