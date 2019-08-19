import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    // console.log('Guard Activated');
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.roles) {
        let allowed = false;
        const roles = route.data.roles;
        for (let i = 0, size = roles.length; i < size; i++) {
          if ((roles[i] === 'admin') && (currentUser.isAdmin)) {
            allowed = true;
          }
          if ((roles[i] === 'buyer') && (currentUser.isBuyer)) {
            allowed = true;
          }
          if ((roles[i] === 'seller') && (currentUser.isSeller)) {
            allowed = true;
          }
          if ((roles[i] === 'emp0') && (currentUser.isEmp0)) {
            allowed = true;
          }
          if ((roles[i] === 'emp1') && (currentUser.isEmp1)) {
            allowed = true;
          }
          if ((roles[i] === 'transporter') && (currentUser.isTransporter)) {
            allowed = true;
          }
          if ((roles[i] === 'agent') && (currentUser.isAgent)) {
            allowed = true;
          }
          if ((roles[i] === 'nbfc') && (currentUser.isNbfc)) {
            allowed = true;
          }
          if ((roles[i] === 'bank') && (currentUser.isBank)) {
            allowed = true;
          }
        }

        if (!allowed) {
          this.router.navigate(['/']);
          return false;
        }
      }
      // authorised so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
