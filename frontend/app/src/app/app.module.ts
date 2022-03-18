import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import { AddwordsComponent } from './game/addwords/addwords.component';
import { GameComponent } from './game/game/game.component';
import { HeaderComponent } from './layout/header/header.component';
import {SinglewordComponent} from "./game/addwords/singleword/singleword.component";
import { SummaryComponent } from './game/addwords/summary/summary.component';
import { GameDashboardComponent } from './game/game-dashboard/game-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    AddwordsComponent,
    GameComponent,
    HeaderComponent,
    SinglewordComponent,
    SummaryComponent,
    GameDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
