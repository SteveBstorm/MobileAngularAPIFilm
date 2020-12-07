import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http2SecureServer } from 'http2';
import { Observable } from 'rxjs';
import { Actor } from '../Models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private url : string = "https://localhost:44379/api/"

  constructor(
    private _client : HttpClient
  ) { }

  getAll() : Observable<Actor[]> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Actor[]>(this.url+'actor', {headers : header})
  }

  getActorByInitial(initial : string) : Observable<Actor[]> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Actor[]>(this.url+'/actor/byinitial/'+initial, {headers :header})
  }

  getActorById(id : number) : Observable<Actor> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Actor>(this.url+'/actor/byfilm/'+id, {headers :header})
  }

  getInitial() : Observable<string> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<string>(this.url+'/actor/initials/', {headers :header})
  }

}
