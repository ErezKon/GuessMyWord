import { createAction, props } from "@ngrx/store";
import { Blacklist } from "src/models/blacklist.model";
import { Word } from "src/models/word.model";

export const getRandomWord = createAction('[Words] Get Random Word',
props<{ language: string }>());
export const getWord = createAction('[Words] Get Word',
props<{ language: string; word: string }>());
export const getWordSuccess = createAction('[Words] Get Word Success',
props<{ word: Word, dec: number }>());
export const getWordFailure = createAction('[Words] Get Word Failure');


export const getAllWords = createAction('[Words] Get All Words',
props<{ language: string }>());
export const getAllWordsSuccess = createAction('[Words] Get All Words Success',
props<{ words: Word[] }>());
export const getAllWordsFailure  = createAction('[Words] Get All Words Failure');

export const addWord = createAction('[Words] Add Word',
props<{ language: string; word: string }>());
export const addWordSuccess = createAction('[Words] Add Word Success',
props<{ word: Word }>());
export const addWordFailure = createAction('[Words] Add Word Failure');

export const getBlacklist = createAction('[Words] Get Blacklist');
export const getBlacklistSuccess = createAction('[Words] Get Blacklist Success',
props<{ blacklist: Map<string, Blacklist> }>());
export const getBlacklistFailure = createAction('[Words] Get Blacklist Failure');

export const getLanguagesIds = createAction('[Words] Get Languages Ids',
props<{ language: string }>());
export const getLanguagesIdsSuccess = createAction('[Words] Get Languages Ids Success',
props<{ ids: string[], dec: number }>());
export const getLanguagesIdsFailure = createAction('[Words] Get Languages Ids Failure');


export const resetLanguageIds = createAction('[Words] Reset Language Ids');
