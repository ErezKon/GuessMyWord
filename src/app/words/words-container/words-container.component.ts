import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Word } from 'src/models/word.model';
import { selectLoading, selectWord, selectHasWord } from 'src/state-management/selectors/words.selector';
import { IAppState } from 'src/state-management/states/app.state';
import { AddWordComponent } from '../add-word/add-word.component';

import * as wordsActions from '../../../state-management/actions/words.actions';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

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

  lengths: number[] = [];

  private triesSubject = new BehaviorSubject<number | null>(null);

  tries$: Observable<number | null> = this.triesSubject.asObservable();

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
      return `${environment.appUrl}/#/word/${word.language}/${word.guid}`;
    }));
    const minLength = environment.minLength;
    const maxLength = environment.maxLength;

    for(let i = minLength; i <= maxLength; i++) {
      this.lengths.push(i);
    }
  }

  addWord() {
    const dialogRef = this.dialog.open(AddWordComponent, {
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(wordsActions.addWord({ language: result.language, word: result.word, description: result.description }));
      }
    });
  }

  onSolved(tries: number) {
    this.triesSubject.next(tries);
  }

  onSelectionChange(event: any) {
    this.selectedLanguage = event.value;
    this.store.dispatch(wordsActions.getRandomWord({language: this.selectedLanguage, length: this.selectedLength}));
  }

  onPlayAnotherWord() {
    this.store.dispatch(wordsActions.getRandomWord({language: this.selectedLanguage, length: this.selectedLength}));
  }

  onLengthChanged(event: MatButtonToggleChange) {
    this.selectedLength = event.value;
    this.store.dispatch(wordsActions.getRandomWord({language: this.selectedLanguage, length: this.selectedLength}));
  }

}
