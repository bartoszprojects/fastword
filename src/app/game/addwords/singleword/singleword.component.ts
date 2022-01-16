import { Component, OnInit } from '@angular/core';
import {SubjectWordsService} from "../../../data/main.service";

@Component({
  selector: 'app-singleword',
  templateUrl: './singleword.component.html',
  styleUrls: ['./singleword.component.sass']
})
export class SinglewordComponent implements OnInit {
  added_words : Array<string> = [];
  word_to_add : string = '';
  constructor(private service: SubjectWordsService) { }

  ngOnInit(): void {
  }

  addWord(word: string) {
    console.log('enter')
    this.word_to_add = '';
    this.added_words.push(word)

  }

  addWords() {
    this.service.sendWords(this.added_words)
  }

}
