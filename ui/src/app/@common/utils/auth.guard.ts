import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "@sanmix/ui/@common/utils/auth.service";

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  public canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isLoggedIn() && this.auth.isAlive()) {
      return true;
    }
    this.router.navigate(['/logout']).then();
    return false;
  }

}
