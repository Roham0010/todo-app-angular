import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service.service";
import { inject } from "@angular/core";
import { catchError, map, of } from "rxjs";

export const GuestService: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loggingStatus.pipe(
    map((value) => {
      if (value) {
      router.navigate(['todos']);
      return false;
    }
  return true;}),
    catchError(() => {
      router.navigate(['todos']);
      return of(false);
    })
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => GuestService(route, state);