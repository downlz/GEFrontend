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
export class BargainService extends DataService {
  constructor(http: HttpClient) {
    const url = environment.baseUrl + '/bargain';
    super(url, http);
  }

  getBuyerBargain(buyerid, itemid) {
    return this.http.get(this.url + '/buyer/' + buyerid + '/item/' + itemid);
  }

  getSellerBargain(sellerid, itemid) {
    return this.http.get(this.url + '/seller/' + sellerid + '/item/' + itemid);
  }

  getSellerAllBargain(sellerid) {
    return this.http.get(this.url + '/seller/' + sellerid);
  }

  getBuyerAllBargain(buyerid) {
    return this.http.get(this.url + '/buyer/' + buyerid);
  }

  getBargainLapseTime(bargainId) {
    return this.http.get(this.url + '/lapsetime/' + bargainId);
  }

  updateQuote(bargainId, userquote) {
    console.log(userquote);
    return this.http
      .put<any>(this.url + '/' + bargainId, userquote);
  }
}
