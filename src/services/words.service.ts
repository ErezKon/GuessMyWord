import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Firestore, collection, docData, collectionData, DocumentData, doc, arrayUnion } from '@angular/fire/firestore';
import * as firebase from 'firebase/compat';
import { BehaviorSubject, map, Observable, of, Subscription } from 'rxjs';
import { shuffle } from 'src/app/utils/functions/array.shuffle';
import { environment } from 'src/environments/environment';
import { Blacklist } from 'src/models/blacklist.model';
import { Word } from 'src/models/word.model';

import { v4 as uuidv4 } from 'uuid';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService implements OnDestroy {

  private blacklists = new Map<string, Blacklist>();
  private allWords = new Map<string, Observable<Word[]>>();
  private ids = new Map<string, string[]>();
  private subscriptions = new Array<Subscription>();
  private subject = new BehaviorSubject<Map<string, Blacklist>>(this.blacklists);

  constructor(private firestore: Firestore, private afs: AngularFirestore, private loadingService: LoadingService) {

    if (!localStorage.getItem('ids')) {
      localStorage.setItem('ids', '[]');
    }

    for (const lang of environment.languages) {
      const sub = this.getLanguageBlacklist(lang.value).subscribe(b => {
        this.blacklists.set(lang.value, b);
        this.subscriptions.push(this.getLanguageIds(lang.value).subscribe(ids => {
          this.ids.set(lang.value, ids);
        }));
        this.subject.next(this.blacklists);
      });
    }
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  addWord(collectionName: string, word: string): string {
    const id = uuidv4();
    const docName = `${collectionName}/${id}`;
    const idsDoc = `${collectionName}/ids`;
    const docRef: AngularFirestoreDocument<any> = this.afs.doc(docName);
    const idsRef: AngularFirestoreDocument<any> = this.afs.doc(idsDoc);

    docRef.set(
      {
        id: id,
        word: word
      });
    idsRef.update({
      ids: arrayUnion(id)
    });

    return docName;
  }

  getWord(collectionName: string, word: string, loadingIncreased: boolean = false): Observable<Word> {
    if (!collectionName || !word) {
      return of({} as Word);
    }
    if (this.allWords.has(collectionName)) {
      console.log('getting word from cache');
      return (this.allWords.get(collectionName) as Observable<Word[]>)
        .pipe(map(words => words.find(w => w.id === word) as Word));
    }
    console.log('fetching word from db');
    const document = doc(this.firestore, `${collectionName}/${word}`);
    return docData(document, { idField: 'id' })
      .pipe(map(w => {
        return this.convertToWord(w);
      }));
  }

  getRandomWord(language: string, ids: string[]): Observable<Word> {
    let randomId: string | null = '';

    const usedIds: string[] = JSON.parse(localStorage.getItem('ids') as string) ?? [];
    let index = 0;
    randomId = this.getRandomId(ids, usedIds);
    if (randomId === null) {
      return of({
        id: '-1',
        word: ''
      } as Word);
    }
    return this.getWord(language, randomId, true);
  }

  getAll(collectionName: string): Observable<Word[]> {
    if (this.allWords.has(collectionName)) {
      return this.allWords.get(collectionName) as Observable<Word[]>;
    }
    const words = this.fetchAllWords(collectionName);
    this.allWords.set(collectionName, words);
    return words;
  };

  getBlackList(): Observable<Map<string, Blacklist>> {
    return this.subject.asObservable();
  }

  getLanguageIds(language: string): Observable<string[]> {
    const document = doc(this.firestore, `${language}/ids`);
    return docData(document)
      .pipe(map(id => {
        return id["ids"] as string[];
      }));
  }

  private getRandomId(ids: string[], usedIds: string[]): string | null {
    if (!ids) {
      return null;
    }
    if (!usedIds) {
      usedIds = [];
    }
    const filtered = ids.filter(id => usedIds.indexOf(id) === -1);
    if (filtered.length === 0) {
      return null;
    }
    const randomId = shuffle(filtered)[Math.floor(Math.random() * filtered.length)] as string;
    return randomId;
  }

  private fetchAllWords(collectionName: string): Observable<Word[]> {
    const col = collection(this.firestore, collectionName)
    const ret = collectionData(col)
      .pipe(map(data => {
        return data.filter(d => d['word'] !== undefined)
          .map(w => this.convertToWord(w));
      }));

    return ret;
  }

  private getLanguageBlacklist(language: string): Observable<Blacklist> {
    const document = doc(this.firestore, `${language}/blacklist`);
    return docData(document)
      .pipe(map(b => {
        return {
          language: language,
          forbiddenWords: b['filtered']
        } as Blacklist;
      }));
  }

  private convertToWord(doc: DocumentData): Word {
    let convertedWord;
    if (doc) {
      convertedWord = {
        id: doc['id'],
        word: doc['word'],
        createdBy: doc['createdBy']
      } as Word;
    } else {
      convertedWord = {} as Word;
    }
    console.log(convertedWord);
    return convertedWord;
  }
}
