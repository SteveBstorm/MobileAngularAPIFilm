import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../Models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private url : string = "https://localhost:44379/api/language"

  constructor(
    private _client : HttpClient
  ) { }

  getAll() : Observable<Language[]> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Language[]>(this.url, {headers : header})
  }
}
