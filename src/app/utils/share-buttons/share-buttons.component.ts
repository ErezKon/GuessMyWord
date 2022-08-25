import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {

  @Input()
  public wordUrl$!: Observable<string>;

  @Input()
  public tries$!: Observable<number | null>;

  constructor() { }

  ngOnInit(): void {
  }

}
