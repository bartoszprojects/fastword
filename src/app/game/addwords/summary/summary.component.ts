import { Component, OnInit } from '@angular/core';
import {SubjectAddWordsService, SubjectWordsService} from "../../../data/main.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {
  words : [] = [];
  constructor(private service: SubjectAddWordsService) { }

  ngOnInit(): void {
    this.service.getWords().subscribe(res => {
      this.words = res
      this.service.completeSubject()
    })
  }

}
