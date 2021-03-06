import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntryEgress } from '../entry-egress.model';
import { EntryEgressService } from '../entry-egress.service';
import Swal from 'sweetalert2';
import * as entryEgressReducer  from '../entry-egress.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  subscription: Subscription 
  items: EntryEgress[];
  constructor(private store: Store<entryEgressReducer.AppState>, public entryEgressService: EntryEgressService) { }

  ngOnInit() {
    this.subscription = this.store.select('entryEgress')
      .subscribe( entryEgress => {
        this.items = entryEgress.items;
      })
  }
  
  removeItem( item: EntryEgress) {

    this.entryEgressService.removeEntryEgress(item.uid)
      .then( () => {
        Swal('Eliminado', item.description, 'success');
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
