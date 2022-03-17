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
  data_for_backend : Array<any> = [];
  constructor(private subjectService: SubjectAddWordsService, private service: MainService, private jsonService: MainService) { }

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
    this.added_words_final.push({'origin_word' : this.origin_word_to_add, 'words_to_translate': this.added_words })
    this.subjectService.sendWords(this.added_words_final);
    this.added_words = []
    this.origin_word_to_add = ''
    this.translated_word_to_add = ''
    this.value_input.nativeElement.focus()
  }

  saveToDB(){
    this.service.postWordToFlask({"word_name" : this.origin_word_to_add}).subscribe((res : any) => {
      let id_of_added_record = res['id']
      console.log('id: ', id_of_added_record)
      console.log('data_for_backend: ', this.data_for_backend[0])
      let final_dict : any = [];
      for (let elem in this.data_for_backend) {
        final_dict.push({"for_word": id_of_added_record, "translated_word": this.data_for_backend[elem] });
      }
      console.log('final_dict: ', final_dict)

      this.service.postTranslationsToFlask({"bulk" : final_dict}).subscribe((res : any) => {
        console.log('response from postTranslationsToFlask: ', res)
        this.data_for_backend = []
      })
    })
  }

}
