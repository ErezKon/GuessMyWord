import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Word } from 'src/models/word.model';
import { selectLoading, selectWord, selectHasWord } from 'src/state-management/selectors/words.selector';
import { IAppState } from 'src/state-management/states/app.state';
import { AddWordComponent } from '../add-word/add-word.component';

import * as wordsActions from '../../../state-management/actions/words.actions';
import { equals } from 'src/app/utils/functions/array.equals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.scss']
})
export class WordsContainerComponent implements OnInit {

  selectedLanguage = environment.defaultLanguage.value;

  selectedLength = environment.defaultRandomLength;

  ids!: string[];

  word$!: Observable<Word>;

  loading$!: Observable<boolean>;

  subscriptions = new Array<Subscription>();

  hasWord$!: Observable<boolean>;

  wordUrl$!: Observable<string>;

  constructor(private store: Store<IAppState>,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(wordsActions.getRandomWord({ language: this.selectedLanguage, length: this.selectedLength }));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.hasWord$ = this.store.pipe(select(selectHasWord));
    this.word$ = this.store.pipe(select(selectWord));
    this.wordUrl$ = this.word$.pipe(map(word => {
      if (!word) {
        return '';
      }
      return `${environment.appUrl}/word/${word.language}/${word.guid}`;
    }));
  }

  addWord() {
    const dialogRef = this.dialog.open(AddWordComponent, {
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(wordsActions.addWord({ language: result.language, word: result.word }));
      }
    });
  }

  onSelectionChange(event: any) {
    this.selectedLanguage = event.value;
  }

  onPlayAnotherWord() {
    this.store.dispatch(wordsActions.getRandomWord({language: this.selectedLanguage, length: this.selectedLength}))
  }

}
