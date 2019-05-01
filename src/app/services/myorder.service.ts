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

  url= environment.baseUrl + '/order/user';
  constructor(private http: HttpClient) { }

  get(resourceId) {
    return this.http.get(this.url + '/' + resourceId);
  }
}
