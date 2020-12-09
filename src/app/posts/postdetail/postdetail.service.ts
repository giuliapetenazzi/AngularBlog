import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from '../post';
import { HttpErrorHandler, HandleError } from '../../utils/http-error-handler.service';

@Injectable()
export class PostService {
    postUrl: string = "https://jsonplaceholder.typicode.com/posts";
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = httpErrorHandler.createHandleError('PostService');
    }

    /** GET post from the server */
    getPost(postId): Observable<Post> {
        return this.http.get<Post>(`${this.postUrl}/${postId}`)
            .pipe(
                catchError(this.handleError('getPost', {} as Post))
            );
    }
}