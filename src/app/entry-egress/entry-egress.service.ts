import { SetItemsAction, UnsetItemsAction } from './entry-egress.actions';
import { EntryEgress } from './entry-egress.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryEgressService {

  entryEgressListenerSubscription: Subscription = new Subscription();
  entryEgressItemsSubscription: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore, 
              public authService: AuthService,
              private store: Store<AppState>) {}

  createEntryEgress( entryEgress: EntryEgress) {

    const user = this.authService.getUser();

    return this.afDB.doc(`${ user.uid }/entry-egress`)
      .collection('items').add({ ...entryEgress });
  }

  initEntryEgressListener() {
    this.entryEgressListenerSubscription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user !== null )
      )
      .subscribe( auth => {
        this.entryEgressItems(auth.user.uid);
      })
  }

  private entryEgressItems( uid: string ) {
    this.entryEgressItemsSubscription = this.afDB.collection(`${uid}/entry-egress/items`)
        .snapshotChanges()
        .pipe(
          map( itemCollection => {
            return itemCollection.map( doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              }
            })
          })
        )
        .subscribe( (collection: any) => {

          this.store.dispatch( new SetItemsAction(collection) );
        })
  }

  cancelSubscriptions() {
    this.entryEgressItemsSubscription.unsubscribe();
    this.entryEgressListenerSubscription.unsubscribe();
    this.store.dispatch( new UnsetItemsAction() );
  }

  removeEntryEgress( uid: string ) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/entry-egress/items/${uid}`)
      .delete();      
  }

}
