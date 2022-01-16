import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private data_url = './assets/data/data.json';

  constructor(private http: HttpClient) { }

  getDataFromJsonFile(): Observable<any> {
    return this.http.get<any>(this.data_url);

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

