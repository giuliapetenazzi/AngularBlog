import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './post';
import { HttpErrorHandler, HandleError } from '../utils/http-error-handler.service';

@Injectable()
export class PostsService {
  postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('PostsService');
  }

  /** GET postes from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        catchError(this.handleError('getPosts', []))
      );
  }
}