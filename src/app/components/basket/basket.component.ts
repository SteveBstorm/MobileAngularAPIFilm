import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/Models/film.model';
import { RentalService } from 'src/app/Services/rental.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket : Film[]

  constructor(
    private _rentService : RentalService
  ) { }

  ngOnInit(): void {
    this.basket = this._rentService.getBasket()
  }

  confirm(){
    this._rentService.confirmRental()
  }

}
