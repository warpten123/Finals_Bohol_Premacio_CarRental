import { RequestRental } from './../../services/request-rental/request-rental-interface';
import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { UserViewProfileComponent } from './../user-view-profile/user-view-profile.component';
import { UsersService } from './../../services/users/users.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersInterface } from './../../services/users/user-interface';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-view-request',
  templateUrl: './user-view-request.component.html',
  styleUrls: ['./user-view-request.component.css']
})
export class UserViewRequestComponent implements OnInit {
  
  constructor(
    private afs: AuthenticationService,
    private crudUser: UsersService,
    private crudRents: RequestRentalService,
    ) { }
  userData!: any;
  user$: any;
  email!: string;
  temp_User!: UsersInterface[];
  curr_User!: UsersInterface[];
  count: number = 0;
  found: boolean = false;
  rentals: RequestRental[] = [];
  ngOnInit(): void {
   
    this.crudRents.getRentalRequests().subscribe((val)=>{
      this.rentals = val;
     });
     console.log(this.rentals);
  }//end ngoninit
  
  click(){
    
  }

}
