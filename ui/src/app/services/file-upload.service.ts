import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Import1CTable} from "../../../../@libs/models/common.model";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {}

  import1C(data: Import1CTable[]): Observable<any> {
    return this.http.post(`/api/item/import1c`, {data});
  }
}
