import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit , OnDestroy {
  loading: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe( ui => this.loading = ui.isLoading );
  }

  onSubmit(data: any) {
    this.authService.login(data.email, data.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }
}
