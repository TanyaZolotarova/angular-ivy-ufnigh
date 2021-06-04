import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IPaginationRequest} from "../models/user.data";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getSelections(): Observable<any> {
   return this.httpClient.get(`${environment.api}/selection`);
  }

  updateSelectUser(user): Observable<any>  {
    return this.httpClient.post(`${environment.api}/selection`, user, {});
  }

  deleteSelectUser(ids): Observable<any>  {
    return this.httpClient.post(`${environment.api}/selection-delete`, ids);
  }

  getNamesAssets({pageSize, pageIndex, search}:IPaginationRequest): Observable<any>{
    return this.httpClient.get(`${environment.api}/names?search=${search}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }



}
