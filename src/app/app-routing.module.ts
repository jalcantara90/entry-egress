import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', component: DashboardComponent },
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