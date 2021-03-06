import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './post';
import { HttpErrorHandler, HandleError } from '../utils/http-error-handler.service';
import { AppSettings } from '../utils/appSettings';

/**
 * Posts service manages the GET request to obtain the posts array
 */
@Injectable()
export class PostsService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('PostsService');
  }

  /** GET postes from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(AppSettings.API_ENDPOINT+'/posts')
      .pipe(
        catchError(this.handleError('getPosts', []))
      );
  }
}