import {Component, OnInit, ViewChild} from '@angular/core';
import {MainService} from "../../data/main.service";
import {interval} from "rxjs";
import {timer} from "rxjs";
import {delay, finalize, take, takeUntil, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit{
  @ViewChild('value_input', {static: true}) value_input: any;
  small_interval: any;
  cycle_time_left: any;
  current_word : string = '';
  words_to_translate: Array<any> = [];
  user_input: string = '';
  words : Array<any> =  [];
  points : number = 0;
  global_word_index: number = 0;
  passed_words : Array<any> = []
  title: string = '';
  time: number = 0;
  time_interval : number = 100
  temp_numb : number  = 0;

  progress_bar : number = 0;
  is_progress_bar : boolean = false;
  answer_color: boolean = false;

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.service.getDataFromFlask().subscribe((res :any ) =>  {
      console.log('words: ', res)
      console.log('word: ', res['words'][0]['word_name'])
      console.log('word_to_Translate: ', res['words'][0]['foreign_list']['data'])
      this.words = res['words']
      console.log('ABCABC: ', this.words[1]['word_name'])
      console.log('BCABCA: ', this.words[1]['foreign_list']['data'])
    })
  }

  startEverything() {

    this.bigInterval()
  }

  // this function runs Big Interval - it means interval for list of words. Every cycle is single word
  bigInterval() {
    this.user_input = '';
    try {
      this.is_progress_bar = true
      this.current_word = this.words[this.global_word_index]['word_name']
      let temp_list : Array<any> = []
      for (let elem in this.words[this.global_word_index]['foreign_list']['data']) {
        temp_list.push(this.words[this.global_word_index]['foreign_list']['data'][elem]['translated_word'])
      }
      this.words_to_translate = temp_list
      this.time = 2000
      this.global_word_index += 1
      let timer$ = timer(this.time+1)
      console.log('this.time: ', this.time)

      interval(100)
        .pipe(take(11))
        .pipe(finalize(()=>this.smallInterval(timer$)))
        .subscribe(res => {
          this.progress_bar = res * 10

      })
    }
    catch(e) {
      console.log('nie ma juz slowek')

    }
  }

  // this function runs Small Interval - it means interval for every word: it's counting time inner single word
  smallInterval(timer: Observable<any>) {
    this.temp_numb = 100
    this.cycle_time_left = this.time

    this.small_interval = interval(this.time_interval)
      .pipe(tap(()=> this.is_progress_bar = false))
      .pipe(takeUntil(timer))
      .pipe(finalize(()=>this.bigInterval()))
      .subscribe(val => {
        this.value_input.nativeElement.focus()
        let tempNumb = (100 / (this.time / this.time_interval))
        this.temp_numb -= Number(tempNumb)
        if (this.temp_numb < Number(tempNumb)) {
          this.temp_numb = 0
        }

        console.log('this.bart', this.temp_numb)
        console.log('abc: ', tempNumb)
        console.log('--------------')
        this.cycle_time_left -= this.time_interval

    });
  }

  stopIntervals() {
    this.small_interval.unsubscribe()
    console.log('it takes: ', moment.duration(this.cycle_time_left).asSeconds())

  }
  // this function check every change in MAIN GAME INPUT, it means that if you write 'd' , 'do', 'dog' and 'dog' is
  // equal to 'word_to_translate' then it adds point and change word to next
  modelChangeFn(value: any) {
    if (this.words_to_translate.includes(value)) {
      this.temp_numb = 0
      this.points += 1
      this.answer_color = true
      timer(100).subscribe(res=> {
        this.answer_color = false
      })
      this.passed_words.push({origin_word : this.current_word,
        translated_word: this.user_input,
        origin_time: 2000,
        time_left: this.cycle_time_left})
      this.user_input = '';
      this.small_interval.unsubscribe()

    }
  }

}
