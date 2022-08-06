import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Word } from 'src/models/word.model';
import { WordsService } from 'src/services/words.service';

@Component({
  selector: 'app-word-container',
  templateUrl: './word-container.component.html',
  styleUrls: ['./word-container.component.scss']
})
export class WordContainerComponent implements OnInit {

  word$!: Observable<Word>;
  language!: string;
  private subscriptions = new Array<Subscription>();

  constructor(private route: ActivatedRoute, private wordsService: WordsService) { }
  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub?.unsubscribe();
    }
  }

  ngOnInit(): void {
    const routeSub = this.route.params.subscribe((params: Params) => {
      if (params && params['language'] && params['id']) {
        this.language = params['language'];
        this.word$ = this.wordsService.getWord(params['language'], params['id']);
      }
    });
    this.subscriptions.push(routeSub);
  }

}
