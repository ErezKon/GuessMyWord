import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { L10nTranslationService } from 'angular-l10n';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/services/authentication.service';
import { WordsService } from 'src/services/words.service';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { enLocale, heLocale } from './i10n.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GuessMyWord';

  selectedLanguage = environment.defaultLanguage;

  constructor(public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translation: L10nTranslationService) {
      //if(!this.translation.getLocale()) {
      this.translation.setLocale(heLocale);
      document.body.classList.add('rtl');
      //}
      this.matIconRegistry.addSvgIcon(
        `google`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/google-96.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `facebook`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/facebook-96.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `twitter`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/twitter.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `whatsapp`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/WhatsApp.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `link`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/link.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `il`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/israel.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `en`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/us-uk.svg')
      );
  }

  onLanguageChanged(language: string) {
    const body = document.body;
    switch(language) {
      case 'english':
        this.selectedLanguage = {
          value: 'english',
          display: 'English'
         };
         this.translation.setLocale(enLocale);
         body.classList.remove('rtl');
        break;
      case 'hebrew':
        this.selectedLanguage = {
          value: 'hebrew',
          display: 'עברית'
         };
         this.translation.setLocale(heLocale);
         body.classList.add('rtl');
        break;
      default:
        break;
    }
  }

  onLogin() {
    const dialogRef = this.dialog.open(AuthorizationComponent, {
      width: '300px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   switch(result) {
    //     case 'facebook':
    //       this.authService.facebookAuth();
    //       break;
    //     case 'google':
    //       this.authService.googleAuth();
    //       break;
    //   }
    // });
  }
}
