import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public constructor() {}

  isLoggedIn(): boolean {
    return (this.getToken() ?? '') !== '';
  }

  isAlive(): boolean {
    try {
      const uData = atob(localStorage.getItem('t')?.split('.')[1]);
      const tokenExp = JSON.parse(uData)?.['exp'];
      if (tokenExp === null) {
        return false;
      }

      const timeNow = new Date();
      const expTime = new Date(tokenExp *1000);
      expTime.setSeconds(expTime.getSeconds() - 60);
      return (timeNow < expTime);
    } catch (e) {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('t') ?? '';
  }
}
