import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyorderService {

  url= environment.baseUrl + '/order';
  constructor(private http: HttpClient) { }

  get(resourceId,pageid,pageSize) {
    return this.http.get(
      // this.url + '/user/' + resourceId
      `${this.url}/user/${resourceId}?pageid=${pageid}&pageSize=${pageSize}`
      );
  }

  getagent(resourceId,pageid,pageSize) {
    return this.http.get(
      // this.url + '/agent/' + resourceId
      `${this.url}/agent/${resourceId}?pageid=${pageid}&pageSize=${pageSize}`
      );
  }
}
