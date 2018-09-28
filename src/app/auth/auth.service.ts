import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from './../shared/ui.actions';
import { Subscription } from 'rxjs';

import { User } from './user.model';
import { SetUserAction } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth, 
              private router: Router,
              private afDb: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      if ( fbUser ) {
        this.subscription = this.afDb.doc(`user/${fbUser.uid}`).valueChanges()
          .subscribe( ( userObject: any ) => {
            const newUser = new User ( userObject );

            this.store.dispatch( new SetUserAction(newUser) );
          });
      } else {

        this.subscription.unsubscribe();
      }
    })
  }

  createUser(name: string, email: string, password: string) {
    
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then( res => {
        
        const user: User = {
          uid: res.user.uid,
          name: name,
          email: res.user.email
        }

        this.afDb.doc(`user/${ user.uid }`)
          .set( user )
          .then( () => {
            this.router.navigate(['/']);
          }).catch( error => {
            Swal('Error al crear usuario', error.message, 'error');
          })

        this.store.dispatch( new DesactivateLoadingAction() );
      })
      .catch(error => {

        this.store.dispatch( new DesactivateLoadingAction() );
        Swal('Error en el login', error.message, 'error');
      })
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then( user => {
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivateLoadingAction() );
      })
      .catch(error => {

        this.store.dispatch( new DesactivateLoadingAction() );
        Swal('Error en el login', error.message, 'error');
      })
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then( data => {
        this.router.navigate(['/login']);
      })
      .catch( error => {
        console.error(error);
      })
  }

  isAuth() {
    // con el .pipe en el resultado de un observable, lanzando el operador map de RxJS podemos transformar el resultado en bool.
    return this.afAuth.authState
      .pipe(
        map( ( fbUser: firebase.User ) => {
          if ( fbUser == null) {
            this.router.navigate(['/login']);
          }
          return fbUser != null
        })
      );
  }
}
