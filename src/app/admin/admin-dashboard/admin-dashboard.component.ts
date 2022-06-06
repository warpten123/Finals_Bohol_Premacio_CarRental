import { HotToastService } from '@ngneat/hot-toast';
import { UsersInterface } from './../../services/users/user-interface';
import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: UsersInterface[]=[];
  user: any;
  constructor(
    private crud: UsersService,

    ) { }

  ngOnInit(): void {
    this.crud.getUsers().subscribe((val) => {
      this.users = val;
      // console.log(this.users);
    });
  }

 
 
  
}
