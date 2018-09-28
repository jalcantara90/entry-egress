import { dasboardRoutes } from './dashboard/dashboard.routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', 
      component: DashboardComponent,
      children: dasboardRoutes ,
      canActivate: [ AuthGuardService ]  
    },
    { path: '**', redirectTo: ''}
]

@NgModule({
    imports: [ 
        RouterModule.forRoot( routes )
     ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {}