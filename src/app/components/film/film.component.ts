import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/category.model';
import { Film } from 'src/app/Models/film.model';
import { Language } from 'src/app/Models/language.model';
import { CategoryService } from 'src/app/Services/category.service';
import { FilmService } from 'src/app/Services/film.service';
import { LanguageService } from 'src/app/Services/language.service';
import { RentalService } from 'src/app/Services/rental.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  films : Film[]

  category : Category[]
  language : Language[]
  currentCat : number
  currentLang : number
  keyword : string

  sub : Subscription

  constructor(
    private _filmService : FilmService,
    private _catService : CategoryService,
    private _rentService : RentalService,
    private _langService : LanguageService
  ) { }

  ngOnInit(): void {
    this.sub = this._filmService.subFilm.subscribe({
      next : (data : Film[])=> this.films = data
      
    })
    this._filmService.getAll()

    this._catService.getAll().subscribe({
      next : (data : Category[]) => this.category = data
    })

    this._langService.getAll().subscribe({
      next : (data : Language[]) => this.language = data
    })
  }

  byCategory(){
    console.log(this.currentCat)
    this._filmService.getByCategory(this.currentCat)
    this._filmService.emitFilm()
  }
  byLanguage(){
    this._filmService.getByLanguage(this.currentLang)
  }

  byKeyWord() {
    this._filmService.getByKeyword(this.keyword)
  }

  addToRent(id : number){
    console.log("film id : " + id)
    this._rentService.addRent(id)
  }

}
