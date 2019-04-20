import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { AppError } from '../common/app-error';
// import { NotFoundError } from '../common/not-found-error';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/category', http);
  }

  /**
   * Get Categories by Item
   * @param item
   */
  getCategoriesByItem(item) {
    return this.http.get(`${this.url}/byItem/${item}`);
  }
}
