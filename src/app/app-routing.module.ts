import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorComponent } from './components/actor/actor.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { BasketComponent } from './components/basket/basket.component';
import { FdetailComponent } from './components/film/fdetail/fdetail.component';
import { FilmComponent } from './components/film/film.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'film', component : FilmComponent},
  {path : 'film/detail/:id', component : FdetailComponent},
  {path : 'actor', component : ActorComponent},
  {path : 'basket', component : BasketComponent},
  {path : '**', component : WelcomeComponent, pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
