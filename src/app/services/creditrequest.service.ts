import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/creditrequest';
    super(url, http);
  }

  getUserCreditRequest(userid) {
    return this.http.get(this.url + '/user/' + userid);
  }
}
