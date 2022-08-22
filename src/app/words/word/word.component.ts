import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { L10nTranslationService } from 'angular-l10n';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { KeyboardCustomClass } from 'src/app/utils/keyboard/keyboard/keyboard-custom-class.model';
import { environment } from 'src/environments/environment';
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
  public playAnotherWord = new EventEmitter<void>();

  activeI: number = 0;

  activeJ: number = 0;

  solved: boolean = false;

  failed: boolean = false;

  letters = new Array<Array<string>>();

  hasWord = this.word?.id !== -1;

  usedLetters = { classPerLetter: new Map<string, string>() } as KeyboardCustomClass;

  usedLetters$!: BehaviorSubject<KeyboardCustomClass>;

  tooltips = new Array<Array<string>>();

  private wordMap = new Map<string, number[]>();

  private wordMapped = false;

  constructor(private router: Router,
    private translation: L10nTranslationService) { }

  ngOnInit(): void {
    this.usedLetters$ = new BehaviorSubject<KeyboardCustomClass>(this.usedLetters);
    for (let i = 0; i < environment.guessTries; i++) {
      this.letters[i] = new Array<string>();
      this.tooltips[i] = new Array<string>();
      for (let j = 0; j < (this.word as Word)?.word?.length; j++) {
        this.letters[i][j] = ' ';
        this.tooltips[i][j] = ' ';
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
      if(this.activeI >= environment.guessTries) {
        this.failed = true;
        return;
      }
    }
  }

  onPlayAnotherWord() {
    this.playAnotherWord.emit();
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

  private updateInnerMap(map: Map<string, number[]>, letters: string[]) {
    let i = 0;
    for (const letter of letters) {
      if(map.has(letter)){
        map.get(letter)?.push(i++);
      } else {
        map.set(letter, [i++]);
      }
    }
  }

  private markBoxes() {
    this.mapWord();
    const innerMap = new Map<string, number[]>();
    this.updateInnerMap(innerMap, this.letters[this.activeI]);
    for (let i = 0; i < (this.word as Word).word.length; i++) {
      const letter = this.letters[this.activeI][i];
      const box = document.getElementById(`letter-box-${this.activeI}-${i}`);
      if(this.wordMap.has(letter)) {
        const indexes = this.wordMap.get(letter) as number[];
        if(indexes.indexOf(i) !== -1) {
          box?.classList.add('correct-letter');
          this.tooltips[this.activeI][i] = this.translation.translate('CORRECT_LOCATION');
        }
        const letterCount = this.letters[this.activeI].filter(l => l === letter).length;
        if(indexes.length > letterCount){
          for (const index of innerMap.get(letter) as number[]) {
            const anotherBox = document.getElementById(`letter-box-${this.activeI}-${index}`);
            if(anotherBox?.classList.contains('wrong-location')){
              continue;
            }
            anotherBox?.classList.add('more-letters');
            this.tooltips[this.activeI][i] = this.translation.translate('MORE_LETTERS');
          }
        } else if(indexes.length < letterCount){
          for (const index of innerMap.get(letter) as number[]) {
            const anotherBox = document.getElementById(`letter-box-${this.activeI}-${index}`);
            if(anotherBox?.classList.contains('wrong-location')){
              continue;
            }
            anotherBox?.classList.add('extra-letters');
            this.tooltips[this.activeI][i] = this.translation.translate('EXTRA_LETTERS');
          }
        }
        if(indexes.indexOf(i) === -1) {
          box?.classList.remove('extra-letters');
          box?.classList.remove('more-letters');
          box?.classList.add('wrong-location');
          this.tooltips[this.activeI][i] = this.translation.translate('WRONG_LOCATION');;
        }
      }
    }
  }

  private mapWord() {
    if(!this.word || this.wordMapped) {
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
    this.wordMapped = true;
  }

  onLetterClick(i: number, j: number) {
    if (this.activeI === i) {
      this.activeJ = j;
    }
  }

}
