import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'numberToSeconds'
})
export class NumberToSecondsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return moment.duration(value).asSeconds();
  }

}
