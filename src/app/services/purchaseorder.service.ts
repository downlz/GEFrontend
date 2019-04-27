import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { AppError } from '../common/app-error';
//  import { NotFoundError } from '../common/not-found-error';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/getpo', http);
  }
}