import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { EntryEgress } from '../entry-egress.model';
import { EntryEgressService } from '../entry-egress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  subscription: Subscription 
  items: EntryEgress[];
  constructor(private store: Store<AppState>, public entryEgressService: EntryEgressService) { }

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
