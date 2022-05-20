import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo, AuthGuard} from '@angular/fire/auth-guard';

const redirecToLogin = () => redirectUnauthorizedTo(['login']);
const redirecToUser = () => redirectUnauthorizedTo(['user-dashboard']);
const redirecToAdmin  = () => redirectUnauthorizedTo(['admin-dashboard']);
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
    path: 'admin',
    component: AdminLoginComponent,
    //...canActivate(redirecToLogin)
    
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    ...canActivate(redirecToLogin),
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    //...canActivate(redirecToAdmin),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
