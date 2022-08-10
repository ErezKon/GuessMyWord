import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { KeyboardCustomClass } from 'src/app/utils/keyboard/keyboard/keyboard-custom-class.model';
import { Word } from 'src/models/word.model';
import { LoadingService } from 'src/services/loading.service';
import { WordsService } from 'src/services/words.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  @Input()
  public word!: Word | null; // = {} as Word;

  @Input()
  public language!: string;

  @Output()
  public resetWordsCache = new EventEmitter<void>();

  activeI: number = 0;

  activeJ: number = 0;

  solved: boolean = false;

  letters = new Array<Array<string>>();

  hasWord = this.word?.id !== '-1';

  usedLetters = { classPerLetter: new Map<string, string>() } as KeyboardCustomClass;

  usedLetters$!: BehaviorSubject<KeyboardCustomClass>;

  private wordMap = new Map<string, number[]>();

  constructor() { }

  ngOnInit(): void {
    this.usedLetters$ = new BehaviorSubject<KeyboardCustomClass>(this.usedLetters);
    for (let i = 0; i < 6; i++) {
      this.letters[i] = new Array<string>();
      for (let j = 0; j < (this.word as Word)?.word?.length; j++) {
        this.letters[i][j] = ' ';
      }
    }
  }

  onKeyPressed(key: string) {
    this.letters[this.activeI][this.activeJ] = key
    this.activeJ++;
    if (this.activeJ >= (this.word as Word)?.word.length) {
      this.markBoxes();
      this.updateUsedLetters();
      const guessedWord = this.letters[this.activeI].join('');
      if (guessedWord === this.word?.word) {
        this.solved = true;
        const usedIds: string[] = JSON.parse(localStorage.getItem('ids') as string) ?? [];
        localStorage.setItem('ids', JSON.stringify([...usedIds, this.word.id]));
        return;
      }
      this.activeI++;
      this.activeJ = 0;
    }
  }

  onDelete() {
    if(this.activeJ === 0) {
      return;
    }
    this.letters[this.activeI][--this.activeJ] = '';
  }

  private updateUsedLetters() {
    for (const letter of this.letters[this.activeI]) {
      if(!this.usedLetters.classPerLetter.has(letter) && this.word?.word.indexOf(letter) === -1) {
        this.usedLetters.classPerLetter.set(letter, 'gray-out');
      }
    }
    this.usedLetters$.next(this.usedLetters);
  }

  private markBoxes() {
    this.mapWord();
    for (let i = 0; i < (this.word as Word).word.length; i++) {
      const letter = this.letters[this.activeI][i];
      const box = document.getElementById(`letter-box-${this.activeI}-${i}`);
      if(this.wordMap.has(letter)) {
        const indexes = this.wordMap.get(letter) as number[];
        if(indexes.indexOf(i) === -1) {
          box?.classList.add('wrong-location');
        } else {
          box?.classList.add('correct-letter');
        }
      }
    }
  }

  private mapWord() {
    if(!this.word) {
      return;
    }
    for (let i = 0; i < (this.word as Word).word.length; i++) {
      const char = (this.word as Word).word[i];
      if(this.wordMap.has(char)) {
        const indexes = this.wordMap.get(char) as number[];
        this.wordMap.set(char, [...indexes, i]);
      } else {
        this.wordMap.set(char, [i]);
      }
    }
  }

  onLetterClick(i: number, j: number) {
    if (this.activeI === i) {
      this.activeJ = j;
    }
  }

  onResetWordsCache() {
    this.resetWordsCache.emit();
  }

}
