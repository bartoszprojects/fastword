import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private data_url = './assets/data/data.json';

  constructor(private http: HttpClient) {
  }

  getDataFromJsonFile(): Observable<any> {
    return this.http.get<any>(this.data_url);

  }

  getDataFromFlask() {
    return this.http.get("http://localhost:5222/words")
  }

  postWordToFlask(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    // data =
    //   {
    //     "word_name": "exampple"
    //   }
    return this.http.post('http://localhost:5222/words', data, httpOptions);
  }

  postTranslationsToFlask(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    // data =
    //   {
    //     "for_word": 1,
    //     "translated_word": "string"
    //   }

    return this.http.post('http://localhost:5222/bulk_translations', data, httpOptions);
  }
  deleteSingleWordFromFlask(id: number) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let examp1 = {"word_id": id}
    return this.http.delete('http://localhost:5222/words', { body: examp1 });
  }
}

@Injectable({providedIn: 'root'})
export class SubjectWordsService {
  private subject = new Subject<any>();

  sendWords(data: any) {
    this.subject.next(data);
  }

  clearWords() {
    this.subject.next([]);
  }

  getWords() {
    return this.subject
  }
}


@Injectable({providedIn: 'root'})
export class SubjectAddWordsService {
  private subject = new Subject<any>();

  sendWords(data: any) {
    this.subject.next(data);
  }

  completeSubject() {
    this.subject.complete()
  }

  clearWords() {
    this.subject.next([]);
  }

  getWords() {
    return this.subject;

  }
}


