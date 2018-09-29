import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';
import { EntryEgressService } from '../../entry-egress/entry-egress.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user: User;
  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private store: Store<AppState>, public entryEgressService: EntryEgressService) { }

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
  
  logout() {
    this.entryEgressService.cancelSubscriptions();
    this.authService.logout();
  }
}
