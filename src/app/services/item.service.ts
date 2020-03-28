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
export class ItemService extends DataService {
  constructor(http: HttpClient) {
    const url= environment.baseUrl + '/item';
    super(url, http);
  }
  getallitem() {
    return this.http.get(this.url + '/all' );
  }
  getallitembypage(pageid,pageSize) {
    return this.http.get(
      `${this.url}/all?pageid=${pageid}&pageSize=${pageSize}`
      );
  }

  itemSearch(text) {
    return this.http.get(
      `${this.url}/search/${text}`
      );
  }

}
