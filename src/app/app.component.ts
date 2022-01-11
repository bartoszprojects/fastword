import {Component, OnInit} from '@angular/core';
import {MainService} from "./data/main.service";
import {interval} from "rxjs";
import {timer} from "rxjs";
import {finalize, take} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  main_interval : any;
  small_interval: any;

  my_variable: any;
  foo = 'Hello';
  bar = 'World';
  time: number = 0;
  how_long: number = 1000;
  time_long: number = 1000;
  constructor(private service: MainService) {

  }

  ngOnInit(): void {
    this.service.getDataFromJsonFile().subscribe(res => console.log(res))

    this.main_interval = timer(1000, 1000).pipe(take(10)).subscribe((res: any) => {
      console.log('response from main_interval: ', res)
      this.smallInterval()
    })
  }

  smallInterval() {
    this.time_long = 1000;
    this.small_interval = timer(0,100).pipe(take(10)).subscribe((res:any) => {
      this.time_long -= 100
      console.log(this.time_long)
      if (this.time_long == 0) {
        console.log('---------------------------------')


      }
    })
  }

  stopSmallInterval() {
    this.small_interval.unsubscribe()
    this.main_interval.unsubscribe()
    console.log('it takes: ', (1000 - this.time_long))
  }

  changeFn(e: any) {
    console.log(e.target.value);
  }
  modelChangeFn(value: any) {
    console.log(value);
  }

}
