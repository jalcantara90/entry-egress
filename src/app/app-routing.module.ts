import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: '',
        loadChildren: './entry-egress/entry-egress.module#EntryEgressModule',
        canLoad: [ AuthGuardService ]
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