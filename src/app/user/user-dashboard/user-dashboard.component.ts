import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CardViewComponent } from './../card-view/card-view.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RequestRental } from './../../services/request-rental/request-rental-interface';
import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CarsInterface } from './../../services/cars/cars-interface';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars/cars.service';
import { UsersInterface } from 'src/app/services/users/user-interface';
import { AdminEditComponent } from 'src/app/admin/admin-edit/admin-edit.component';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  // user$ = this.authService.currentUser$;
  cars: CarsInterface[]=[];
  check!: UsersInterface;
  user$: any;
  temp_User!: UsersInterface[];
  curr_User!: UsersInterface;
  rents!: RequestRental[];
  email!: string;
  count: number = 0;
  found: boolean = false;
  foundCar: boolean = false;
  passCarData!: CarsInterface;
  passUserData!: Subject<UsersInterface>;
  
  constructor(private router: Router, 
    private crudCar: CarsService,
    private authService: AuthenticationService,
    private crudUser: UsersService,
    private toast: HotToastService,
    private crudRental: RequestRentalService,
    private dialog: MatDialog,
    private fire: AngularFireAuth,
    ) {
     
     }
     searchForm: FormGroup = new FormGroup({
      search: new FormControl('', Validators.required),
      
    });
    

  ngOnInit(): void {
    this.crudCar.getCars().subscribe((val: CarsInterface[]) => {
      this.cars = val;
    });
   
    this.fire.authState.subscribe((user: any) => {
      this.email = user.email;
    })
   

    this.crudUser.getUsers().subscribe((user: UsersInterface[])=> {
      this.temp_User = user;
    while(!this.found){
      if(this.temp_User[this.count].email == this.email){
        this.curr_User = this.temp_User[this.count];
        this.found = true;
        }else
          this.count++;
    }
     console.log(this.curr_User);
    })
    
  }
  
  filterItems(search: string){ 
    this.cars.length = 0;
    this.crudCar.getCars().subscribe((cars: CarsInterface[])=>{
      for(let i = 0; i < cars.length; i++){
        if(cars[i].carLocation.barangay.toLowerCase() == search.toLowerCase()){
          this.cars.push(cars[i]);
          console.log(this.cars.length);
        }else if(cars[i].carLocation.city.toLowerCase() == search.toLowerCase()){
          this.cars.push(cars[i]);
        }
      }
      if(!this.searchForm.valid){
        this.cars = cars;
      }
    })
    
  }//end filter items
  onView(car: CarsInterface){
    if( this.curr_User.money < car.carRentPrice){
      this.toast.error("You don't have enough money!");
      return;
    }else if(this.checkCar(car.$carKey) && car.carStatus != "Available"){
      this.toast.error("The car might be already in your request tab.");
      return;
    }
    this.onEdit(car);
   
  }

  onEdit(cars: CarsInterface){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "60%";
    this.dialog.open(CardViewComponent,dialogConfig);
    this.crudCar.getPassCarValue(cars);
    this.crudUser.getPassUserValue(this.curr_User);
  }
  checkCar(carKey: string){
    for(let i = 0; i < this.curr_User.rentedVehicles.length; i++){
      if(carKey == this.curr_User.rentedVehicles[i]){
        return this.foundCar = true;
      }
    }
  return this.foundCar = false;
  }
}
