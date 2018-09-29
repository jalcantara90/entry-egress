import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, public authService: AuthService) { }

  canActivate() {

    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth().pipe( take(1) );
  }
}
