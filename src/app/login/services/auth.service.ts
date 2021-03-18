import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { of } from 'rxjs';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.afAuth.authState.pipe(mergeMap((user) => {
      if (user) {
        //return this.afs.doc<User>(`users/${user.uid}`);
        return this.afs.collection<Roles>('userProfile').doc(user.uid).valueChanges()
          .pipe(
            mergeMap(roles => {
              this.user = new User();
              this.user.email = user.email;
              this.user.uid = user.uid;
              this.user.roles = roles?.Roles;
              return of(this.user);
            })
          );
      } else {
        return of(undefined);
      }
    })).subscribe((user) => {
      if (user) {
        localStorage.setItem('userLogin', JSON.stringify(user));
      } else {
        localStorage.removeItem('userLogin');
        this.user = new User();
      }
    });
  }

  signIn(user: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(user, password)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  isAuthenticated(): boolean {
    if (
      localStorage.getItem('userLogin') !== '' &&
      localStorage.getItem('userLogin') !== undefined &&
      localStorage.getItem('userLogin') !== null
    ) {
      return true;
    }
    return false;
  }
  haveRol(roles: string[]): boolean {
    return this.user.haveRol(roles);
  }

  // SignIn(email: string, password: string) {
  //   this.authService.cre.signInWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       console.log('You are Successfully logged in!');
  //     })
  //     .catch((err) => {
  //       console.log('Something is wrong:', err.message);
  //     });
  // }

  signOut() {
    this.afAuth.signOut();
    localStorage.removeItem('userLogin');
    this.user = new User();
    this.router.navigate(['login']);
  }
}
