import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { User } from '../../auth/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription = new Subscription();
  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user !== null && auth.user !== undefined )
      )
      .subscribe( auth => this.user = auth.user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
