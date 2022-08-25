import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { L10nTranslationService } from 'angular-l10n';
import { catchError, map, mergeMap, Observable, withLatestFrom } from 'rxjs';
import { equals } from 'src/app/utils/functions/array.equals';
import { SnackbarService } from 'src/services/snackbar.service';
import { WordsService } from 'src/services/words.service';

import * as wordsActions from '../actions/words.actions';
import { selectWordsState } from '../selectors/words.selector';

import { IAppState } from '../states/app.state';



@Injectable()
export class WordsEffects {


  constructor(private actions$: Actions,
    private store: Store<IAppState>,
    private wordsService: WordsService,
    private router: Router,
    private translation: L10nTranslationService,
    private snackbar: SnackbarService) { }

  getWord$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.getWord),
    withLatestFrom(this.store.select(selectWordsState)),
    mergeMap(([action, state]) => this.wordsService.getWord(action.request)
      .pipe(
        map(word => {
          return wordsActions.getWordSuccess({ word: word});
        }),
        catchError(async () => {
          this.snackbar.openSnackBar(this.translation.translate("GET_WORD_FAILED"));
          return wordsActions.getWordFailure();
        })
      ))
  )
  );

  getRandomWord$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.getRandomWord),
    withLatestFrom(this.store.select(selectWordsState)),
    mergeMap(([action, state]) => this.wordsService.getRandomWord(action.language, action.length)
      .pipe(
        map(word => {
          return wordsActions.getWordSuccess({ word: word });
        }),
        catchError(async () => {
          this.snackbar.openSnackBar(this.translation.translate("GET_WORD_FAILED"));
          return wordsActions.getWordFailure();
        })
      ))
  )
  );

  addWord$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.addWord),
    withLatestFrom(this.store.select(selectWordsState)),
    mergeMap(([action, state]) => this.wordsService.addWord(action.language, action.word, action.description)
      .pipe(
        map(word => {
          if (word) {
            this.snackbar.openSnackBar(this.translation.translate("WORD_ADDED"));
            this.router.navigateByUrl(`word/${word.language}/${word.guid}`);
          }
          return wordsActions.addWordSuccess({ word: word });
        }),
        catchError(async () => {
          this.snackbar.openSnackBar(this.translation.translate("ADD_WORD_FAILED"));
          return wordsActions.addWordFailure();
        })
      ))
  )
  );
}
