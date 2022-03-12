import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToSecondsPipe } from './pipes/number-to-seconds.pipe';



@NgModule({
  declarations: [
    NumberToSecondsPipe
  ],
  exports: [
    NumberToSecondsPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
