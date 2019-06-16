import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidService extends DataService  {

  constructor(http: HttpClient) {
    const url = environment.baseUrl + '/bid';
    super(url, http);
  }

  confirmOrder(bid) {
    return this.http.post(this.url + '/confirmOrder/' + bid,null);
  }

  bestbid(id,type) {
    return this.http.get(this.url + '/bestbid/' + id + '/type/' + type );
  }
}
