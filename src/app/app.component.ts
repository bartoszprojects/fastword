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
  words : Array<any> = ['dog', 'cat', 'forest']

  my_variable: any;
  foo = 'Hello';
  bar = 'World';

  constructor(private service: MainService) {

  }

  ngOnInit(): void {
    this.service.getDataFromJsonFile().subscribe(res => console.log(res))

    this.main_interval = timer(0, this.how_long).pipe(take(10)).subscribe((res: any) => {
      console.log('response from main_interval: ', res)
      this.smallInterval()
    })
  }

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

  stopSmallInterval() {
    this.small_interval.unsubscribe()
    this.main_interval.unsubscribe()
    console.log('it takes: ', moment.duration(this.cycle_time_left).asSeconds())

  }

  changeFn(e: any) {
    console.log(e.target.value);
  }
  modelChangeFn(value: any) {
    if (value === 'dog') {
      this.stopSmallInterval()
    }
  }

}
