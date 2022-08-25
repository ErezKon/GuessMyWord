import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { L10nTranslationService } from 'angular-l10n';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar, private translation: L10nTranslationService) { }

  openSnackBar(message: string, duration: number = 5000) {
    const direction = this.translation.getLanguageDirection();
    this._snackBar.open(message,'', {
      duration: duration,
      direction: direction
    } as MatSnackBarConfig);
  }
}
