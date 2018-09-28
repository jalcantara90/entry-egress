import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, 
              private router: Router,
              private afDb: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    })
  }

  createUser(name: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then( res => {
        
        const user: User = {
          uid: res.user.uid,
          name: name,
          email: res.user.email
        }

        this.afDb.doc(`${ user.uid }/user`)
          .set( user )
          .then( () => {
            this.router.navigate(['/']);
          }).catch( error => {
            Swal('Error al crear usuario', error.message, 'error');
          })
      })
      .catch(error => {
        console.error(error);
        Swal('Error en el login', error.message, 'error');
      })
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then( user => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
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
