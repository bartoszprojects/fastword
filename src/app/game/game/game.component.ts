import {Component, OnInit} from '@angular/core';
import {MainService} from "../../data/main.service";
import {interval} from "rxjs";
import {timer} from "rxjs";
import {finalize, take, takeUntil} from "rxjs/operators";
import {Observable} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit{
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
  time: any;
  time_interval : number = 100
  bart : number = 0;

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.service.getDataFromJsonFile().subscribe(res => {
      this.words = res
      console.log('a',this.words)
    })


  }

  startEverything() {
    this.bigInterval()
  }

  // this function runs Big Interval - it means interval for list of words. Every cycle is single word
  bigInterval() {

    try {
      this.current_word = this.words[this.global_word_index].origin_word
      this.word_to_translate = this.words[this.global_word_index].word_to_translate
      this.time = this.words[this.global_word_index].time
      this.global_word_index += 1
      let timer$ = timer(this.time+1)
      console.log('this.time: ', this.time)
      this.smallInterval(timer$)
    }
    catch(e) {
      console.log('nie ma juz slowek')

    }

  }

  // this function runs Small Interval - it means interval for every word: it's counting time inner single word
  smallInterval(timer: Observable<any>) {
    this.cycle_time_left = this.time
    this.small_interval = interval(this.time_interval)
      .pipe(takeUntil(timer))
      .pipe(finalize(()=>this.bigInterval()))
      .subscribe(val => {
      this.bart += 1
      this.cycle_time_left -= this.time_interval
      console.log(this.cycle_time_left)


    });
  }

  stopIntervals() {
    this.small_interval.unsubscribe()
    console.log('it takes: ', moment.duration(this.cycle_time_left).asSeconds())

  }

  modelChangeFn(value: any) {
    if (value === this.word_to_translate) {
      this.points += 1
      this.passed_words.push({origin_word : this.current_word,
        translated_word: this.user_input,
        origin_time: 2000,
        time_left: this.cycle_time_left})
      this.user_input = '';
      this.small_interval.unsubscribe()

    }


  }

}
