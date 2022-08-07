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
    this.letters[this.activeI][this.activeJ] = key;
    const box = document.getElementById(`letter-box-${this.activeI}-${this.activeJ}`);
    box?.classList.remove('correct-letter');
    box?.classList.remove('wrong-location');
    if(key === (this.word as Word)?.word[this.activeJ]) {
      box?.classList.add('correct-letter');
    } else if((this.word as Word)?.word.indexOf(key) !== -1 && (this.word as Word)?.word.indexOf(key) !== this.activeJ) {
      box?.classList.add('wrong-location');
    }
    this.activeJ++;
    if(this.activeJ >= (this.word as Word)?.word.length) {
      const guessedWord = this.letters[this.activeI].join('');
      if(guessedWord === this.word?.word) {
        this.solved = true;
        //alert(`guessed the word on ${this.activeI + 1} tries!`);
        return;
      }
      this.activeI++;
      this.activeJ = 0;
    }
  }

  onLetterClick(i: number, j: number) {
    if(this.activeI === i) {
      this.activeJ = j;
    }
  }

}
