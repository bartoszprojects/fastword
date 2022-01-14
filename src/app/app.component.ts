import {Component, OnInit} from '@angular/core';
import {MainService} from "./data/main.service";
import {interval} from "rxjs";
import {timer} from "rxjs";
import {finalize, take} from "rxjs/operators";
import {Observable} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  main_interval : any;
  small_interval: any;
  how_long: number = 5000;
  cycle_time_left: any;
  current_word : string = '';
  word_to_translate: string = '';
  words : Array<any> = ['dog', 'cat', 'red', 'lala']
  points : number = 0;
  global_word_index: number = 0;
  time_left : any;


  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.service.getDataFromJsonFile().subscribe(res => console.log(res))


  }

  startEverything() {
    this.bigInterval()
  }

  // this function runs Big Interval - it means interval for list of words. Every cycle is single word
  bigInterval() {
    this.main_interval = timer(0, this.how_long).pipe(take(this.words.length - this.global_word_index))
      .subscribe((res: any) => {

      this.current_word = this.words[this.global_word_index]
      this.global_word_index += 1

      console.log('response from main_interval: ', res)
      this.smallInterval()
    })
  }

  // this function runs Small Interval - it means interval for every word: it's counting time inner single word
  smallInterval() {
    this.cycle_time_left = this.how_long
    let cycles_amount = this.how_long / 100
    this.small_interval = timer(0,100).pipe(take(cycles_amount)).subscribe((res:any) => {
      this.cycle_time_left -= 100
      console.log(this.cycle_time_left)
      if (this.cycle_time_left == 0) {
        console.log('---------------------------------')
      }
    })
  }

  stopIntervals() {
    this.small_interval.unsubscribe()
    this.main_interval.unsubscribe()
    console.log('it takes: ', moment.duration(this.cycle_time_left).asSeconds())

  }

  modelChangeFn(value: any) {
    if (value === this.current_word) {
      this.points += 1
      this.word_to_translate = ''
      this.stopIntervals()
      this.startEverything()
    }
  }

  cleanx() {
    this.word_to_translate = ''
  }

}
