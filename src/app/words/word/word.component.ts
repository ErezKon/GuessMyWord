import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Word } from 'src/models/word.model';
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

  activeI: number = 0;

  activeJ: number = 0;

  solved: boolean = false;

  letters = new Array<Array<string>>();

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 6; i++) {
      this.letters[i] = new Array<string>();
      for (let j = 0; j < (this.word as Word)?.word.length; j++) {
        this.letters[i][j] = ' ';
      }
    }
  }

  onKeyPressed(key: string) {
    this.letters[this.activeI][this.activeJ] = key
    this.activeJ++;
    if (this.activeJ >= (this.word as Word)?.word.length) {
      this.markBoxes();
      const guessedWord = this.letters[this.activeI].join('');
      if (guessedWord === this.word?.word) {
        this.solved = true;
        return;
      }
      this.activeI++;
      this.activeJ = 0;
    }
  }

  private markBoxes() {
    const word = (this.word as Word).word;
    for (let i = 0; i < (this.word as Word).word.length; i++) {
      const letter = this.letters[this.activeI][i];
      const box = document.getElementById(`letter-box-${this.activeI}-${i}`);
      const letterIndex = word.indexOf(letter);
      if (letterIndex === i) {
        box?.classList.add('correct-letter');
      } else if(letterIndex !== -1) {
        box?.classList.add('wrong-location');
      }
    }
  }

  onLetterClick(i: number, j: number) {
    if (this.activeI === i) {
      this.activeJ = j;
    }
  }

}
