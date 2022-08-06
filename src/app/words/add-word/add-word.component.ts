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

  selectedLanguage = environment.defaultLanguage.value

  lang = new BehaviorSubject<string>(environment.defaultLanguage.value);

  private subscriptions = new Array<Subscription>();

  private blacklist!: Map<string, Blacklist>;

  constructor(public dialogRef: MatDialogRef<AddWordComponent>, private wordService: WordsService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.wordService.getBlackList().subscribe(blacklist => {
      this.blacklist = blacklist;
    }));
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

  addWord() {
    this.dialogRef.close({word:this.word, language: this.selectedLanguage});
  }

  onSelectionChange(event: any) {
    this.lang.next(this.selectedLanguage);
    this.word = '';
    this.disableAddWord = true;
  }

}
