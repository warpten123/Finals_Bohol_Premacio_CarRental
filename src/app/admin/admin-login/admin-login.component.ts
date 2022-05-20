import { Router } from '@angular/router';
import { AdminServicesService } from './../../services/admin/admin-services.service';
import { AdminInterface } from './../../services/admin/admin-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isAdmin!: boolean;
  constructor(private fb: FormBuilder, private crud: AdminServicesService,private router: Router) { }

  ngOnInit(): void {
  }
  onSubmitAdmin(adminKey: string){
    this.crud.searchAdmin(adminKey);
    this.router.navigate(['/admin-dashboard']);
  }
  validateClickAdmin(){
    console.log('click admin');
     this.isAdmin = true;
   }
}
