import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Comment } from './comment';
import { HttpErrorHandler, HandleError } from '../../../utils/http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../../utils/appSettings';

@Injectable()
export class CommentsService {
  postId = -1;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('CommentsService');
  }

  /** GET comments from the server */
  getComments(postId): Observable<Comment[]> {
    var url = AppSettings.API_ENDPOINT + '/posts/' + postId.toString() + '/comments';
    //console.log("url", url);
    return this.http.get<Comment[]>(url)//url)
      .pipe(
        catchError(this.handleError('getComments', []))
      );
  }

  /** POST: add a new comment to the database */
  addComment(comment: Comment, postId:number): Observable<Comment> {
    const HTTPOPTIONS = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    var url = AppSettings.API_ENDPOINT + '/posts/' + postId.toString() + '/comments';
    return this.http.post<Comment>(url, comment, HTTPOPTIONS)
      .pipe(
        catchError(this.handleError('addComment', comment))
      );
  }

}