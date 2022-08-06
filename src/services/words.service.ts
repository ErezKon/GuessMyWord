import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Firestore, collection, docData, collectionData, DocumentData, doc } from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable, of, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blacklist } from 'src/models/blacklist.model';
import { Word } from 'src/models/word.model';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WordsService implements OnDestroy {

  private blacklists = new Map<string,Blacklist>();
  private subscriptions = new Array<Subscription>();
  private subject = new BehaviorSubject<Map<string,Blacklist>> (this.blacklists);

  constructor(private firestore: Firestore, private afs: AngularFirestore) {
    for (const lang of environment.languages) {
      const sub = this.getLanguageBlacklist(lang.value).subscribe(b => {
        this.blacklists.set(lang.value, b);
        this.subject.next(this.blacklists);
        console.log(this.blacklists);
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
    const docRef: AngularFirestoreDocument<any> = this.afs.doc(docName);

    docRef.set(
      {
        id: id,
        word: word
      });

      return docName;
    //this.firestore.collection('collectionName').add({name : this.name, personalInfo : this.personalInfo});
  }

  getWord(collectionName: string, word: string): Observable<Word> {
    if (!collectionName || !word) {
      return of({} as Word);
    }
    const document = doc(this.firestore, `${collectionName}/${word}`);
    return docData(document, { idField: 'id' })
      .pipe(map(w => {
        if (w) {
          return {
            id: w['id'],
            word: w['word'],
            createdBy: w['createdBy']
          } as Word;
        }
        return {} as Word;
      }));
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

  getBlackList(): Observable<Map<string,Blacklist>> {
    return this.subject.asObservable();
  }
}
