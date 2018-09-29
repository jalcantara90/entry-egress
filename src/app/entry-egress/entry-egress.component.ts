import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntryEgress } from './entry-egress.model';
import { EntryEgressService } from './entry-egress.service';

import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-entry-egress',
  templateUrl: './entry-egress.component.html',
  styles: []
})
export class EntryEgressComponent implements OnInit, OnDestroy {
  form: FormGroup;
  type: string =  'entry';
  private loadingSubscription: Subscription = new Subscription();
  loading: boolean;

  constructor(public entryEgressService: EntryEgressService,
              private store: Store<AppState>) { }

  ngOnInit() {

    this.loadingSubscription = this.store.select('ui')
      .subscribe( ui => this.loading = ui.isLoading )


    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'mount': new FormControl('0', Validators.min(0)),
    })
  }

  onSubmit() {
    this.store.dispatch( new ActivateLoadingAction() );

    const entryEgress = new EntryEgress({ ...this.form.value, type: this.type });
    this.entryEgressService.createEntryEgress(entryEgress)
      .then( () => {

        this.form.reset({ mount: 0 });
        this.store.dispatch( new DesactivateLoadingAction() );

        Swal('Creado', entryEgress.description, 'success');
      })
      .catch( err => {
        this.store.dispatch( new DesactivateLoadingAction() );
        Swal('Creado', err, 'error');
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
