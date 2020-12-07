import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url : string = "https://localhost:44379/api/category"

  constructor(
    private _client : HttpClient
  ) { }

  getAll() : Observable<Category[]> {
    let header = new HttpHeaders({
      'Authorization' : localStorage['token']
    })
    return this._client.get<Category[]>(this.url, {headers : header})
  }
}