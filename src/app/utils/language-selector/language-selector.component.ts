import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';
import { enLocale, heLocale } from 'src/app/i10n.config';
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

  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale, private translation: L10nTranslationService) { }

  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    switch(event.value) {
      case 'english':
        this.translation.setLocale(enLocale);
        break;

      case 'hebrew':
        this.translation.setLocale(heLocale);
        break;

      default:
        break;
    }
    this.selectionChange.emit(event);
  }
}
