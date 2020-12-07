import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../Models/film.model';
import { Rental } from '../Models/rental.model';
import { AuthService } from './auth.service';
import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  
  private url : string = "https://localhost:44379/api/rental"

  basket : Film[] = []

  constructor(
    private _client : HttpClient,
    private _filmService : FilmService,
    private _authService : AuthService
  ) { }

  rent(rental : Rental){
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    this._client.post<Rental>(this.url, rental ,{headers : header}).subscribe({
      next : () =>console.log("ok"),
      error : (error) => console.log(error)
    })
  }

  addRent(filmId : number) {
    let toAdd = this._filmService.listFilm.find(x => x.filmId == filmId)
    console.log(toAdd)
    this.basket.push(toAdd)
    toAdd = null
  }

  getBasket() : Film[] {
    return this.basket
  }

  removeRent(filmId : number){
    let toRemove = this._filmService.listFilm.findIndex(x => x.filmId == filmId)
    this.basket.splice(toRemove, 1)
  }

  confirmRental(){
    let rentals = new Rental()
    rentals.customerId = parseInt(localStorage['userId'])
    rentals.filmIds = []
    for(let i = 0; i< this.basket.length; i++) 
    {
      rentals.filmIds.push(this.basket[i].filmId)
    }
    console.log(rentals)
    this.rent(rentals)
    this.basket = []
  }
}
