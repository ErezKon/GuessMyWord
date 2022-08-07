import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Word } from 'src/models/word.model';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  @Input()
  public word!: Word;

  @Input()
  public language!: string;

  @Input()
  public index!: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showWord() {
    this.router.navigateByUrl(`word/${this.language}/${this.word.id}`);
  }

}
