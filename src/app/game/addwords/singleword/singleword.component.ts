import {Component, OnInit, ViewChild} from '@angular/core';
import {MainService, SubjectAddWordsService} from "../../../data/main.service";

@Component({
  selector: 'app-singleword',
  templateUrl: './singleword.component.html',
  styleUrls: ['./singleword.component.sass']
})
export class SinglewordComponent implements OnInit {
  @ViewChild('value_input', {static: true}) value_input: any;
  added_words : Array<string> = [];
  added_words_final: Array<any> = [];
  origin_word_to_add : string = '';
  translated_word_to_add : string = '';
  constructor(private service: SubjectAddWordsService, private jsonService: MainService) { }

  ngOnInit(): void {
  }

  addWord(word: string) {
    console.log('enter')
    this.translated_word_to_add = '';
    word = word.slice(0, -1)
    console.log(word)
    this.added_words.push(word)
  }

  addWords() {
    if (this.added_words.length < 2) {
      this.added_words_final.push({'origin_word' : this.origin_word_to_add, 'words_to_translate': [this.translated_word_to_add] })
    }
    else {
      this.added_words_final.push({'origin_word' : this.origin_word_to_add, 'words_to_translate': this.added_words })
    }

    this.service.sendWords(this.added_words_final);
    this.added_words = []
    this.origin_word_to_add = ''
    this.translated_word_to_add = ''
    this.value_input.nativeElement.focus()

  }

  saveToDB(){
    localStorage.setItem('words', JSON.stringify(this.added_words_final));

  }

}
