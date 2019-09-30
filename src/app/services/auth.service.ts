import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {AppError} from '../common/app-error';
import {NotFoundError} from '../common/not-found-error';
import { environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= environment.baseUrl + '/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public redirectUrl: string;
  role: string;
  id : string;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('GEUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe(currentUser => {
      if (currentUser) {
        if (currentUser.isAdmin) {
          this.role = 'admin';
        } else if (currentUser.isSeller) {
          this.role = 'seller';
        } else if (currentUser.isTransporter) {
          this.role = 'transporter';
        } else if (currentUser.isAgent) {
          this.role = 'agent';
        } else if (currentUser.isNbfc) {
          this.role = 'nbfc';
        } else if (currentUser.isBank) {
          this.role = 'bank';
        } else {
          this.role = 'buyer';
        }
        this.id = currentUser._id;
      }
    });
  }

  login(phone: string, password: string) {
    return this.http
      .post<any>(this.url, {
        phone: '+91' + phone,
        password: password
      })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('GEUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
      .pipe(catchError(this.handleError));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('GEUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getToken() {
    return localStorage.getItem('GEUser');
  }

  loggedIn() {
    return !!localStorage.getItem('GEUser');
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource));
  }

  upadate(resource) {
    return this.http
      .put(this.url + '/' + resource.id, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  getRole() {
    return this.role;
  }
  getId() {
    return this.id;
  }

  deletePost(resource) {
    return this.http
      .delete(this.url + '/' + resource.id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    return throwError(new AppError(error));
  }
}
