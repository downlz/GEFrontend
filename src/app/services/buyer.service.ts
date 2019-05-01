import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/user/buyer';
    super(url, http);
  }
}
