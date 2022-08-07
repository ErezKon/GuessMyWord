import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Word } from 'src/models/word.model';
import { WordsService } from 'src/services/words.service';
import { AddWordComponent } from '../add-word/add-word.component';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.scss']
})
export class WordsContainerComponent implements OnInit {

  selectedLanguage = environment.defaultLanguage.value;

  words$!: Observable<Word[]>;

  constructor(public dialog: MatDialog, private wordService: WordsService) { }

  ngOnInit(): void {
    this.words$ = this.wordService.getAll(this.selectedLanguage);
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
    this.words$ = this.wordService.getAll(this.selectedLanguage);
  }

}
