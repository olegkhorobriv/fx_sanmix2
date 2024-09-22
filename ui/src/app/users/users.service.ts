import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginModel} from "../../../../@libs/models/login.model";
import {RegisterModel} from "../../../../@libs/models/register.model";
import {UserCreateModel, UserFilter, UserModel, UserSort} from "../../../../@libs/models/user.model";
import {Page} from "../../../../@libs/models/common.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public constructor(private http: HttpClient) {}

  public fetchUsers(filter: UserFilter, sort: UserSort, page: Page): Observable<any> {
    return this.http.post<any>(`/api/user/users`, {filter, sort, page});
  }

  public getUser(id: string): Observable<any> {
    return this.http.get<any>(`/api/user/${id}`);
  }

  public createUser(input: UserCreateModel): Observable<any> {
    return this.http.post<any>(`/api/user/create`, {input});
  }

  public editUser(input: UserModel): Observable<any> {
    return this.http.post<any>(`/api/user/edit`, {input});
  }
}
