import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  @Input()
  public value: string = environment.defaultLanguage.value;

  @Output()
  public valueChange = new EventEmitter<string>();

  @Output()
  public selectionChange = new EventEmitter<any>();

  selectedLanguage = environment.defaultLanguage.value;

  languages = environment.languages;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    this.selectionChange.emit(event);
  }
}
