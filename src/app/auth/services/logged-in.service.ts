import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service.service";
import { inject } from "@angular/core";
import { Observable, catchError, map, of, pipe } from "rxjs";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
class LoggedInService {

  loggedInStatus: boolean;
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    this.auth.loggingStatus.subscribe(item => this.loggedInStatus = item);
      if (!this.loggedInStatus) {
        this.router.navigate(['login']);
        return false;
      }

      return true;
  }
}

export const LoggedInGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> => {
  return inject(LoggedInService).canActivate(next, state);
}