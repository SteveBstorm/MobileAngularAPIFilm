import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Film } from '../Models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private url : string = "https://localhost:44379/api/film"

  listFilm : Film[] 

  subFilm : Subject<Film[]> = new Subject<Film[]>()

  emitFilm() {
    this.subFilm.next(this.listFilm)
  }

  constructor(
    private _client : HttpClient
  ) { }

  getAll() {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : localStorage['token']
    })
    this._client.get<Film[]>(this.url, {headers : header}).subscribe({
      next : (data : Film[]) => {
        this.listFilm = data
        console.log(data)
        this.emitFilm()
      },
      error : (error) => console.log(error)
    })
  }

  getByCategory(id : number) {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Film[]>(this.url+'/bycategory/'+id, {headers : header}).subscribe({
      next : (data : Film[]) => {
        this.listFilm = data
        this.emitFilm()
      },
      error : (error) => console.log(error)
    })
    
  }

  getByActor(id : number) : Observable<Film[]> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Film[]>(this.url+'/byactor/'+id, {headers : header})
  }

  getByTitle(title : string) : Observable<Film> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.post<Film>(this.url+'/bytitle', {data : title} ,{headers : header})
  }

  getByLanguage(id : number) {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Film[]>(this.url+'/bylanguage/'+id ,{headers : header}).subscribe({
      next : (data : Film[]) => {
        this.listFilm = data
        this.emitFilm()
      },
      error : (error) => console.log(error)
    })
  }

  getByKeyword(key : string)  {
    console.log(key)
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    this._client.post<Film[]>(this.url+'/bykeyword', {data : key} ,{headers : header}).subscribe({
      next : (data : Film[]) => {
        this.listFilm = data
        this.emitFilm()
      },
      error : (error) => console.log(error)
    })
  }

}
