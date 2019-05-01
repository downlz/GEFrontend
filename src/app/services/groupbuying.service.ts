import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupBuyingService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/gblisting';
    super(url, http);
  }
}
