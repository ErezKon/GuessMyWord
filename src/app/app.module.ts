import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShareButtonModule } from 'ngx-sharebuttons/button';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WordsContainerComponent } from './words/words-container/words-container.component';
import { AddWordComponent } from './words/add-word/add-word.component';
import { WordComponent } from './words/word/word.component';
import { WordsComponent } from './words/words/words.component';
import { WordContainerComponent } from './words/word-container/word-container.component';
import { KeyboardComponent } from './utils/keyboard/keyboard/keyboard.component';
import { MaterialModule } from './material/material.module';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LanguageSelectorComponent } from './utils/language-selector/language-selector.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '../state-management/effects/app.effects';

import { appReducers } from 'src/state-management/reducers/app.reducer';
import { IAppState } from 'src/state-management/states/app.state';
import { storeLogger } from 'ngrx-store-logger';
import { WordsEffects } from 'src/state-management/effects/words.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function logger(reducer: ActionReducer<IAppState>): any {
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

library.add();

@NgModule({
  declarations: [
    AppComponent,
    WordsContainerComponent,
    WordComponent,
    WordsComponent,
    AddWordComponent,
    WordContainerComponent,
    KeyboardComponent,
    AuthorizationComponent,
    LanguageSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en'
    }),
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, WordsEffects]),
    ShareButtonModule,
    FontAwesomeModule
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }


