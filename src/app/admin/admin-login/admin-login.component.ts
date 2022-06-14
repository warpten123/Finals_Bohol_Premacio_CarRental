import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {
  isAdmin!: boolean;
  constructor(
    private router: Router,
   @Inject(AuthenticationService) private authService: AuthenticationService,
    private toast: HotToastService,
    ) { }

  ngOnInit(): void {
  }
  adminLoginForm: FormGroup = new FormGroup({
    $key: new FormControl(['']),
    adminEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    adminPass: new FormControl('', [
      Validators.required,
    ]),
  });
  onSubmitAdmin(){
    if (!this.adminLoginForm.valid) {
      this.toast.error("Please fill up all fields");
      return;
    }
    this.authService.login(this.adminLoginForm.value.adminEmail,this.adminLoginForm.value.adminPass).pipe(
      this.toast.observe({
        success: 'Welcome Admin',
        loading: 'Checking...',
        error: 'There was a problem with your login'
      })
    ).subscribe(() => {
      this.router.navigate(['/admin-dashboard']);
    });
  }
  
}
