import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Comment } from './comment';
import { HttpErrorHandler, HandleError } from '../../../utils/http-error-handler.service';

@Injectable()
export class CommentsService {
  postId = -1;
  commentsUrl = 'https://jsonplaceholder.typicode.com/posts/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('CommentsService');
  }

  /** GET commentes from the server */
  getComments(postId): Observable<Comment[]> {
    var url = this.commentsUrl + postId + '/comments';
    //console.log("url", url);
    return this.http.get<Comment[]>(url)//url)
      .pipe(
        catchError(this.handleError('getComments', []))
      );
  }
}