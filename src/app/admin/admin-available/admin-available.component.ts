import { CarsService } from './../../services/cars/cars.service';
import { CarsInterface } from './../../services/cars/cars-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-admin-available',
  templateUrl: './admin-available.component.html',
  styleUrls: ['./admin-available.component.css']
})
export class AdminAvailableComponent implements OnInit {
  cars!: CarsInterface[];
  constructor(private router: Router, 
    private crud: CarsService,
    private toast: HotToastService,
    ) { 
      this.crud.getCars().subscribe((val)=>{
        this.cars = val;
        console.log(this.cars);
      })

    }

  ngOnInit(): void {
  }

}
