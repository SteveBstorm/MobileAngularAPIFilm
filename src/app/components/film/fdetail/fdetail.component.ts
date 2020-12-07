import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Film } from 'src/app/Models/film.model';
import { FilmService } from 'src/app/Services/film.service';

@Component({
  selector: 'app-fdetail',
  templateUrl: './fdetail.component.html',
  styleUrls: ['./fdetail.component.scss']
})
export class FdetailComponent implements OnInit {

  currentFilm : Film

  constructor(
    private _filmService : FilmService,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this._route.snapshot.params['id']
    this.currentFilm = this._filmService.listFilm.find(x => x.filmId == id)
  }

}
