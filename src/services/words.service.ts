import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Firestore, collection, docData, collectionData, DocumentData, doc, arrayUnion } from '@angular/fire/firestore';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import * as firebase from 'firebase/compat';
import { BehaviorSubject, map, Observable, of, Subscription } from 'rxjs';
import { shuffle } from 'src/app/utils/functions/array.shuffle';
import { environment } from 'src/environments/environment';
import { Blacklist } from 'src/models/blacklist.model';
import { emptyWord, Word } from 'src/models/word.model';

import { v4 as uuidv4 } from 'uuid';
import { LoadingService } from './loading.service';

export interface GetWordReqest {
  id?: number;
  guid?: string;
  withMetadata: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WordsService implements OnDestroy {

  private demoWord$ = of({
    id: 21028,
    guid: '29c1775e-692a-4315-ab1f-6f0a32a7791c',
    language: 'english',
    word: 'NINTHLY',
    description: 'In the ninth place.'
  } as Word)

  private baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.serverUrl;
  }

  ngOnDestroy(): void {

  }

  addWord(language: string, word: string, description?: string): Observable<Word> {
    return this.httpClient.post<Word>(`${this.baseUrl}/api/Words/AddWord`, { word: word, language: language, description: description ?? ''});
  }

  getWord(request: GetWordReqest): Observable<Word> {
    //return this.demoWord$;
    if (!request.id && !request.guid) {
      return of({} as Word);
    }
    const withMetaData = request.withMetadata ? true : false;
    let url: string;
    if (request.id) {
      url = `${this.baseUrl}/api/Words/GetWord?id=${request.id}&withMetadata=${withMetaData}`;
    } else {
      url = `${this.baseUrl}/api/Words/GetWord?guid=${request.guid}&withMetadata=${withMetaData}`;
    }
    return this.httpClient.get<Word>(url);
  }

  getRandomWord(language: string, length?: number): Observable<Word> {
    //return this.demoWord$;
    let url = `${this.baseUrl}/api/Words/GetRandomWord?language=${language}`;
    if (length) {
      url = `${url}&length=${length}`;
    }
    return this.httpClient.get<Word>(url);
  }
}
