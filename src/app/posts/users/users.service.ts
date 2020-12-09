import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user';
import { HttpErrorHandler, HandleError } from '../../utils/http-error-handler.service';
import { AppSettings } from '../../utils/appSettings';

@Injectable()
export class UsersService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('UsersService');
  }

  /** GET useres from the server */
  getUserName(userId): Observable<User> {
    var url = AppSettings.API_ENDPOINT + '/users/' + userId.toString();
    return this.http.get<User>(url)
      .pipe(
        catchError(this.handleError('getUsers', {} as User))
      );
  }
}