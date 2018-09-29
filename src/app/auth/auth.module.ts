import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
    ]
})

export class AuhtModule {}