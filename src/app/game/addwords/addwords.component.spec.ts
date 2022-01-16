import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwordsComponent } from './addwords.component';

describe('AddwordsComponent', () => {
  let component: AddwordsComponent;
  let fixture: ComponentFixture<AddwordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
