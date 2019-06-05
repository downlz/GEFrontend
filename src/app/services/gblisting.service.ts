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
export class GBListingService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/gblisting';
    super(url, http);
  }

  getAvlQty(resourceId) {
    return this.http.get(this.url + '/getqty/avl/' + resourceId);
  }

}
