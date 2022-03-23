import {Component, OnInit, ViewChild} from '@angular/core';
import {MainService, SubjectAddWordsService} from "../../../data/main.service";

@Component({
  selector: 'app-singleword',
  templateUrl: './singleword.component.html',
  styleUrls: ['./singleword.component.sass']
})
export class SinglewordComponent implements OnInit {
  @ViewChild('value_input', {static: true}) value_input: any;
  added_words: Array<string> = [];
  added_words_final: Array<any> = [];
  origin_word_to_add: string = '';
  translated_word_to_add: string = '';
  data_for_backend: Array<any> = [];
  error_from_backend: string = '';

  constructor(private subjectService: SubjectAddWordsService, private service: MainService, private jsonService: MainService) {
  }

  ngOnInit(): void {

  }

  addWord(word: string) {
    console.log('enter')
    this.translated_word_to_add = '';
    word = word.slice(0, -1)
    console.log(word)
    this.added_words.push(word)
    this.data_for_backend.push(word)
  }

  addWords() {
    this.saveToDB()
    this.added_words_final.push({'origin_word': this.origin_word_to_add, 'words_to_translate': this.added_words})
    this.added_words = []
    this.origin_word_to_add = ''
    this.translated_word_to_add = ''
    this.value_input.nativeElement.focus()
  }

  saveToDB() {
    this.subjectService.sendWords(this.added_words_final)

    this.service.postWordToFlask({"word_name": this.origin_word_to_add}).subscribe(
      (res: any) => {
        console.log('res from postWordToFlask: ', res.payload.word_name)
        let id_of_added_record = res['id']
        let final_dict: any = [];
        for (let elem in this.data_for_backend) {
          final_dict.push({"for_word": id_of_added_record, "translated_word": this.data_for_backend[elem]});
        }

        this.service.postTranslationsToFlask({"bulk": final_dict}).subscribe(
          (res: any) => {
          console.log('res from postTranslationsToFlask: ', res)
          this.data_for_backend = []
        },
        (err: any) => {
          console.log('HTTP Error', err)
          this.error_from_backend = err.error.error
        }
        )
      },
      (err: any) => {
        console.log('HTTP Error', err)
        this.error_from_backend = err.error.error
      }
    )
  }

}
