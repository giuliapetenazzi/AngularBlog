import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../post';
import { HttpErrorHandler, HandleError } from '../../utils/http-error-handler.service';
import { AppSettings } from '../../utils/appSettings';

/**This service, through its method, retrives data about post, given a certain id */
@Injectable()
export class PostService {
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = httpErrorHandler.createHandleError('PostService');
    }

    /** GET post from the server */
    getPost(postId): Observable<Post> {
        var url = AppSettings.API_ENDPOINT + '/posts/' + postId;
        return this.http.get<Post>(url)
            .pipe(
                catchError(this.handleError('getPost', {} as Post))
            );
    }
}