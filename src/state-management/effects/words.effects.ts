import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, withLatestFrom } from 'rxjs';
import { equals } from 'src/app/utils/functions/array.equals';
import { WordsService } from 'src/services/words.service';

import * as wordsActions from '../actions/words.actions';
import { selectWordsState } from '../selectors/words.selector';

import { IAppState } from '../states/app.state';



@Injectable()
export class WordsEffects {


  constructor(private actions$: Actions,
    private store: Store<IAppState>,
    private wordsService: WordsService) {}

    getWord$ = createEffect(() => this.actions$.pipe(
      ofType(wordsActions.getWord),
      withLatestFrom(this.store.select(selectWordsState)),
      mergeMap(([action, state]) => this.wordsService.getWord(action.word, action.language)
        .pipe(
          map(word => {
            let dec = 0;
            if(word !== state.word) {
              dec = 1;
            }
            return wordsActions.getWordSuccess({ word: word, dec: dec });
          }),
          catchError(async () => wordsActions.getWordFailure())
        ))
      )
    );

  getAllWords$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.getAllWords),
    withLatestFrom(this.store.select(selectWordsState)),
    mergeMap(([action, state]) => this.wordsService.getAll(action.language)
      .pipe(
        map(words => wordsActions.getAllWordsSuccess({ words: words })),
        catchError(async () => wordsActions.getAllWordsFailure())
      ))
    )
  );

  getBlackList$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.getBlacklist),
    withLatestFrom(this.store.select(selectWordsState)),
    mergeMap(() => this.wordsService.getBlackList()
      .pipe(
        map(blacklist => wordsActions.getBlacklistSuccess({ blacklist: blacklist })),
        catchError(async () => wordsActions.getBlacklistFailure())
      ))
    )
  );

  getLanguageids$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.getLanguagesIds),
    withLatestFrom(this.store.select(selectWordsState)),
    mergeMap(([action, state]) => this.wordsService.getLanguageIds(action.language)
      .pipe(
        map(ids => {
          let dec = 0;
          if(!equals(ids, state.languageIds)) {
            dec = 1;
          }
          return wordsActions.getLanguagesIdsSuccess({ ids: ids, dec: dec });
        }),
        catchError(async () => wordsActions.getLanguagesIdsFailure())
      ))
    )
  );

  getRandomWord$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.getRandomWord),
    withLatestFrom(this.store.select(selectWordsState)),
    mergeMap(([action, state]) => this.wordsService.getRandomWord(action.language, state.languageIds)
      .pipe(
        map(word => {
          let dec = 0;
          if(word !== state.word) {
            dec = 1;
          }
          return wordsActions.getWordSuccess({ word: word, dec: dec });
        }),
        catchError(async () => wordsActions.getWordFailure())
      ))
    )
  );
}
