import { createAction, props } from "@ngrx/store";
import { Word } from "src/models/word.model";
import { GetWordReqest } from "src/services/words.service";

export const getRandomWord = createAction('[Words] Get Random Word',
props<{ language: string, length?: number }>());
export const getWord = createAction('[Words] Get Word',
props<{ request: GetWordReqest }>());
export const getWordSuccess = createAction('[Words] Get Word Success',
props<{ word: Word }>());
export const getWordFailure = createAction('[Words] Get Word Failure');


// export const getAllWords = createAction('[Words] Get All Words',
// props<{ language: string }>());
// export const getAllWordsSuccess = createAction('[Words] Get All Words Success',
// props<{ words: Word[] }>());
// export const getAllWordsFailure  = createAction('[Words] Get All Words Failure');

export const addWord = createAction('[Words] Add Word',
props<{ language: string; word: string }>());
export const addWordSuccess = createAction('[Words] Add Word Success',
props<{ word: Word }>());
export const addWordFailure = createAction('[Words] Add Word Failure');
