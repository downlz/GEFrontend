import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService { 
  constructor(http: HttpClient) {
    const url = environment.baseUrl + '/order';
    super(url, http);
  }

  getAllPage(pageid,pageSize) {
    return this.http.get(
      // this.url + '/user/' + resourceId
      `${this.url}?pageid=${pageid}&pageSize=${pageSize}`
      );
  }
}
