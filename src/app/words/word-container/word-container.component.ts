import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Word } from 'src/models/word.model';
import { GetWordReqest, WordsService } from 'src/services/words.service';
import { selectLoading, selectHasWord, selectWord } from 'src/state-management/selectors/words.selector';
import { IAppState } from 'src/state-management/states/app.state';

import * as wordActions from '../../../state-management/actions/words.actions';
import { AddWordComponent } from '../add-word/add-word.component';

@Component({
  selector: 'app-word-container',
  templateUrl: './word-container.component.html',
  styleUrls: ['./word-container.component.scss']
})
export class WordContainerComponent implements OnInit {

  word$!: Observable<Word>;
  loading$!: Observable<boolean>;
  wordUrl$!: Observable<string>;
  hasWord$!: Observable<boolean>;
  language!: string;
  private subscriptions = new Array<Subscription>();

  private triesSubject = new BehaviorSubject<number | null>(null);

  tries$: Observable<number | null> = this.triesSubject.asObservable();

  constructor(private route: ActivatedRoute,
    private store: Store<IAppState>,
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub?.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(selectLoading));
    const routeSub = this.route.params.subscribe((params: Params) => {
      if (params && params['language'] && params['id']) {
        this.language = params['language'];
        this.store.dispatch(wordActions.getWord({ request: { guid: params['id'] } as GetWordReqest }))
        this.word$ = this.store.pipe(select(selectWord));
        this.wordUrl$ = this.word$.pipe(map(word => {
          if (!word) {
            return '';
          }
          return `${environment.appUrl}/#/word/${this.language}/${word.guid}`;
        }));
        this.hasWord$ = this.store.pipe(select(selectHasWord));
      }
    });

    this.subscriptions.push(routeSub);

  }

  onSolved(tries: number) {
    this.triesSubject.next(tries);
  }

  addWord() {
    const dialogRef = this.dialog.open(AddWordComponent, {
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(wordActions.addWord({ language: result.language, word: result.word, description: result.description }))
      }
    });
  }
}
