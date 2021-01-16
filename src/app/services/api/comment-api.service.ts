import { Injectable } from '@angular/core';
import {ApiBaseService} from '@scripter/services/api/api-base.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommentListResponseModel, ICommentListResponseModel} from '@scripter/models/comment-list-response-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/posts');
  }

  /**
   * get comments for post
   * @param postId post id to get
   * @param nextToken next token
   */
  getComments(postId: string, nextToken?: string): Observable<CommentListResponseModel> {
    return this.http.get<ICommentListResponseModel>(this.endpoint(`/${postId}/comments`), {
      params: this._getHttpParams({
        pageToken: nextToken,
      }),
    }).pipe(map(res => {
      return new CommentListResponseModel(res);
    }));
  }
}
