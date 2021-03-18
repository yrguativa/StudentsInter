import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // validate if user is authenticated
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    // validate if user have role for into route
    const expectedRole: string[] = route.data.expectedRole;
    if (expectedRole) {
      return this.auth.haveRol(expectedRole);
    }
    
    return true;
  }

}
