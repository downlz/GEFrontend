import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/auction', http);
  }
}
