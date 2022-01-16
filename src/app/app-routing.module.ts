import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AddwordsComponent} from "./game/addwords/addwords.component";
import {GameComponent} from "./game/game/game.component";

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'add-words', component: AddwordsComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
