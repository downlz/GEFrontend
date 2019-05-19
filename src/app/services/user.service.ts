import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { Observable, throwError } from 'rxjs';
// import { AppError } from '../common/app-error';
// import { NotFoundError } from '../common/not-found-error';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/user';
    super(url, http);
  }

  initiatePassRqst(phone: string, pan: string, gstin: string, password: string) {
    return this.http
      .post<any>(this.url + '/resetpassword', {
        phone: '+91' + phone,
        pan: pan,
        gstin: gstin,
        password: password
      })
  }
}


