import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuctionService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/auction';
    super(url, http);
  }
}
