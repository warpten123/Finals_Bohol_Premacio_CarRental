import { AdminEditComponent } from './../admin-edit/admin-edit.component';
import { CarsService } from './../../services/cars/cars.service';
import { CarsInterface } from './../../services/cars/cars-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
@Component({
  selector: 'app-admin-available',
  templateUrl: './admin-available.component.html',
  styleUrls: ['./admin-available.component.css']
})
export class AdminAvailableComponent implements OnInit {
  cars: CarsInterface[]=[];
  finalCars: CarsInterface[]=[];
  constructor(private router: Router, 
    private crud: CarsService,
    private toast: HotToastService,
    private dialog: MatDialog,
    ) { 

    }
  ngOnInit(): void {
    this.crud.getCars().subscribe((val: CarsInterface[])=>{
      this.cars = val;
    })
  }
  onDelete(carCheck: CarsInterface){
    this.crud.removeCars(carCheck.$carKey);
    this.toast.success(carCheck.carName + " deleted successfully!");
  }
  onEdit(carCheck: CarsInterface){
    this.crud.populateForm(carCheck);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "60%";
    this.dialog.open(AdminEditComponent,dialogConfig);

  }
  
}