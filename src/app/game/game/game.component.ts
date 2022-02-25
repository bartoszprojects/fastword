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
  name1 = 'murex!!!piwko!!'
  main_interval : any;
  small_interval: any;
  how_long: number = 1000;
  cycle_time_left: any;
  current_word : string = '';
  word_to_translate: string = '';
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
    this.service.getDataFromJsonFile().subscribe(res => {
      this.words = res
      console.log('a',this.words)
      console.log(localStorage.getItem('words'))
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
      this.current_word = this.words[this.global_word_index].origin_word
      this.word_to_translate = this.words[this.global_word_index].word_to_translate
      this.time = this.words[this.global_word_index].time
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
    if (this.word_to_translate.includes(value)) {
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


  regex(){
    // space REGEX
    let wordx = 'bye'
    let pl = 'poza'
    let userpl = 'po za'
    // first we have to check if word_to_translate includes 'space' symbol
    let pattern = new RegExp(/ /g);
    // if we know whether there is a space symbol then we can ignore 'space' symbol
    let result=pattern.test(userpl);
    console.log(userpl.replace(/\s/g, ''));

    console.log(result);

  }

}
