import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'admin',
        component: AdminLoginComponent,
      },
      {
        path: '',
        canActivate:[AuthGuard],
        component: HomeComponent,
      },
      {
        path: 'home',
        canActivate:[AuthGuard],
        component: HomeComponent,
      },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
