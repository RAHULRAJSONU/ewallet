import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { UserLoginComponent } from './features/users/user-login/user-login.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'login', component:UserLoginComponent},
  {path:'dashboard', component:LayoutComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
