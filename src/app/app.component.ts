import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/services/authentication.service';
import { WordsService } from 'src/services/words.service';
import { AuthorizationComponent } from './auth/authorization/authorization.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GuessMyWord';

  selectedLanguage = environment.defaultLanguage;

  constructor(private wordsService: WordsService,
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthenticationService) {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/google-96.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `facebook`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/facebook-96.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `whatsapp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/WhatsApp.svg')
    );
  }

  onLogin() {
    const dialogRef = this.dialog.open(AuthorizationComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result) {
        case 'facebook':
          this.authService.facebookAuth();
          break;
        case 'google':
          this.authService.googleAuth();
          break;
      }
    });
  }
}
