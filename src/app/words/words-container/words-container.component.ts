import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map, Observable, of, Subscription } from 'rxjs';
import { shuffle } from 'src/app/utils/functions/array.shuffle';
import { environment } from 'src/environments/environment';
import { Word } from 'src/models/word.model';
import { LoadingService } from 'src/services/loading.service';
import { WordsService } from 'src/services/words.service';
import { selectLanguageIds, selectLoading, selectWord, selectHasWord } from 'src/state-management/selectors/words.selector';
import { IAppState } from 'src/state-management/states/app.state';
import { AddWordComponent } from '../add-word/add-word.component';

import * as wordsActions from '../../../state-management/actions/words.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.scss']
})
export class WordsContainerComponent implements OnInit {

  selectedLanguage = environment.defaultLanguage.value;

  ids!: string[];

  word$!: Observable<Word>;

  loading$!: Observable<boolean>;

  subscriptions = new Array<Subscription>();

  hasWord$!: Observable<boolean>;

  wordUrl$!: Observable<string>;

  constructor(private store: Store<IAppState>,
    public dialog: MatDialog,
    private wordService: WordsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.hasWord$ = this.store.pipe(select(selectHasWord));
    this.store.dispatch(wordsActions.getLanguagesIds({language: this.selectedLanguage}));
    this.subscriptions.push(this.store.pipe(select(selectLanguageIds)).subscribe(ids => {
      this.ids = ids;
      this.store.dispatch(wordsActions.getRandomWord({language: this.selectedLanguage}));
      this.word$ = this.store.pipe(select(selectWord));
    }));
    this.wordUrl$ = this.word$.pipe(map(word => {
      if(!word) {
        return '';
      }
      return `${environment.appUrl}/word/${this.selectedLanguage}/${word.id}`;
    }))
  }

  addWord() {
    const dialogRef = this.dialog.open(AddWordComponent, {
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.wordService.addWord(result.language, result.word);
      }
    });
  }

  onSelectionChange(event: any) {
    this.selectedLanguage = event.value;
    this.store.dispatch(wordsActions.getRandomWord({language: this.selectedLanguage}));
  }

  onResetWordsCache() {
    localStorage.setItem('ids', '[]');
    this.store.dispatch(wordsActions.getRandomWord({language: this.selectedLanguage}));
  }

}
