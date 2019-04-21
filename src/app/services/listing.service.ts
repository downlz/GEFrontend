import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
 import { NotFoundError } from '../common/not-found-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  // constructor(http: HttpClient) {
  //   super('http://localhost:3000/api/item', http);
  // }
  url = 'http://localhost:3000/api/item';
  //http: HttpClient;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/item';
   }
   getAll(res) {
    console.log(this.url + res);
    if (res) {
      return this.http.get(this.url + res);
    }
    return this.http.get(this.url);
  }

  get(resourceId) {
    return this.http.get(this.url + '/' + resourceId);
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource));
  }

  upadate(resource) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource)).pipe(catchError(this.handleError));
  }

  deletePost(resource) {
    return this.http.delete(this.url + '/' + resource.id).pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    return throwError(new AppError(error));
  }

  getListingsByCategory(category) {
    return this.http.get(`${this.url}/byCategory/${category}`);
  }
  
}