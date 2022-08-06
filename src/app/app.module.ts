import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { WordsContainerComponent } from './words/words-container/words-container.component';
import { AddWordComponent } from './words/add-word/add-word.component';
import { WordsComponent } from './words/word/word.component';
import { WordContainerComponent } from './words/word-container/word-container.component';
import { KeyboardComponent } from './utils/keyboard/keyboard/keyboard.component';
import { MaterialModule } from './material/material.module';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    WordsContainerComponent,
    WordsComponent,
    AddWordComponent,
    WordContainerComponent,
    KeyboardComponent,
    AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    TranslateModule.forRoot({
      defaultLanguage: 'en'
    }),
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
