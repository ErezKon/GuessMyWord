import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blacklist } from 'src/models/blacklist.model';
import { WordsService } from 'src/services/words.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit, OnDestroy {

  word: string = '';

  disableAddWord = true;

  languages = environment.languages;

  selectedLanguage = environment.defaultLanguage.value;

  lang = new BehaviorSubject<string>(environment.defaultLanguage.value);

  forbidden: boolean = false;

  private subscriptions = new Array<Subscription>();

  private blacklist!: Map<string, Blacklist>;

  constructor(public dialogRef: MatDialogRef<AddWordComponent>, private wordService: WordsService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  onKeyPressed(key: string) {
    if(this.word.length >= 9) {
      return;
    }
    this.word += key;
    this.disableAddWord = this.word.length < 3;
  }

  onDelete() {
    this.word = this.word.substring(0, this.word.length - 1);
    this.disableAddWord = this.word.length < 3;
  }

  addWord() {
    const blacklist = this.blacklist.get(this.selectedLanguage);
    const forbidden = blacklist?.forbiddenWords.find(w => w === this.word);
    if(forbidden) {
      this.forbidden = true;
      this.word = '';
      return;
    } else {
      this.forbidden = false;
    }
    this.dialogRef.close({word:this.word, language: this.selectedLanguage});
  }

  onSelectionChange(event: any) {
    this.lang.next(event.value);
    this.selectedLanguage = event.value;
    this.word = '';
    this.disableAddWord = true;
  }

}
