import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users$: any[]  = [];
  constructor(private router: Router, private crud: UsersService) { }

  ngOnInit(): void {
    this.crud.getUsers().subscribe((val) => {
      this.users$ = val;
      console.log(this.users$);
    });
  }
  onSubmit(){

  }
  
  
}
