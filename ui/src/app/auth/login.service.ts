import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginModel} from "../../../../@libs/models/login.model";
import {RegisterModel} from "../../../../@libs/models/register.model";
import {UserModel} from "../../../../@libs/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uData: UserModel;

  public constructor(private http: HttpClient) {
    if (!this.uData) this.fillUdata()
  }

  public login(data: LoginModel): Observable<any> {
    return this.http.post<any>(`/api/user/login`, {data});
  }

  public register(data: RegisterModel): Observable<any> {
    return this.http.post<any>(`/api/user/register`, {data});
  }

  fillUdata() {
    if (localStorage.getItem('t'))
      this.uData = JSON.parse(atob(localStorage.getItem('t')?.split('.')[1]));
  }
}
