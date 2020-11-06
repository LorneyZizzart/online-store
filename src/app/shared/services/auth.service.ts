import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Usuario } from '@shared/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = false;

  constructor(public authFire: AngularFireAuth) {}

  login(usuario: Usuario): Promise<firebase.auth.UserCredential> {
    return this.authFire.signInWithEmailAndPassword(
      usuario.email,
      usuario.password
    );
  }

  logout() {
    return this.authFire.signOut();
  }

  hasUser() {
    return this.authFire.authState;
  }

  estaLogueado() {
    return this.authFire.authState.pipe(
      map((user) => (user === null ? false : true))
    );
  }
}
