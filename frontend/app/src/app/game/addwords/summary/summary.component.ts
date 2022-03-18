import { Component, OnInit } from '@angular/core';
import {MainService, SubjectAddWordsService, SubjectWordsService} from "../../../data/main.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {
  words : [] = [];
  words_from_backend : any;
  constructor(private service: MainService, private subjectservice: SubjectAddWordsService) { }

  ngOnInit(): void {
    this.subjectservice.getWords().subscribe(res => {
      this.words = res
      this.subjectservice.completeSubject()
    })

    this.service.getDataFromFlask().subscribe((res:any) => {
      this.words_from_backend = res;
    })
  }

}
