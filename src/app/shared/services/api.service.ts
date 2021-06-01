import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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
    console.warn('user', user);
    return this.httpClient.post(`${environment.api}/selection`, [user], {});
  }

  deleteSelectUser(): Observable<any>  {
    console.log('deleteSelectUser', );
    return this.httpClient.delete(`${environment.api}/selection`, {});
  }


  getNamesAssets(): Observable<any>{
    return this.httpClient.get(`${environment.api}/names`);
  }

}
