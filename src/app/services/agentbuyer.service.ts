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
export class AgentBuyerService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/agentbuyer';
    super(url, http);
  }

  getBuyerAddedByUser(buyerid) {
    return this.http.get(this.url + '/byuser/' + buyerid);
  }

  getBuyerByPhone(phone) {
    return this.http.get(this.url + '/phone/' + phone);
  }
}
