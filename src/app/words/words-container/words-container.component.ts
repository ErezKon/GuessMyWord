import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WordsService } from 'src/services/words.service';
import { AddWordComponent } from '../add-word/add-word.component';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.scss']
})
export class WordsContainerComponent implements OnInit {

  constructor(public dialog: MatDialog, private wordService: WordsService) { }

  ngOnInit(): void {
  }

  addWord() {
    const dialogRef = this.dialog.open(AddWordComponent, {
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
