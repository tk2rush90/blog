import { Injectable } from '@angular/core';
import {ApiBaseService} from '@scripter/services/api/api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IPostListResponseModel, PostListResponseModel} from '@scripter/models/post-list-response-model';
import {PostStatusType} from '@scripter/utils/type.util';
import {AuthResponse} from '@scripter/models/google-models';
import {IPostModel, PostModel} from '@scripter/models/post-model';

export interface IPostRequest {
  category?: string;
  pageToken?: string;
  status?: PostStatusType;
}

@Injectable({
  providedIn: 'root'
})
export class PostApiService extends ApiBaseService {
  constructor(
    private http: HttpClient,
  ) {
    super('/posts');
  }

  /**
   * return the post by id
   * @param id post id
   */
  getPost(id: string): Observable<PostModel> {
    return this.http.get<IPostModel>(this.endpoint(`/${id}`))
      .pipe(map(res => {
        return new PostModel(res);
      }));
  }

  /**
   * get posts
   * @param request request object
   * @param authResponse auth response of google blogger
   */
  getPosts(request: IPostRequest, authResponse?: AuthResponse): Observable<PostListResponseModel> {
    return this.http.get<IPostListResponseModel>(this.endpoint(), {
      params: this._getHttpParams({
        labels: request.category,
        pageToken: request.pageToken,
        status: request.status,
        orderBy: 'published',
      }),
      headers: this._createAuthHeader(authResponse),
    }).pipe(map(res => {
      return new PostListResponseModel(res);
    }));
  }

  /**
   * search posts
   * @param search search string
   */
  searchPosts(search: string): Observable<PostListResponseModel> {
    return this.http.get<IPostListResponseModel>(this.endpoint('/search'), {
      params: this._getHttpParams({
        q: search,
      }),
    }).pipe(map(res => {
      return new PostListResponseModel(res);
    }));
  }

  /**
   * create new post
   * @param post post model
   * @param isDraft set `true` to create post as draft
   * @param authResponse auth response
   */
  createPost(post: PostModel, isDraft: boolean, authResponse: AuthResponse): Observable<PostModel> {
    return this.http.post<IPostModel>(this.endpoint(), post.toRequest(), {
      params: this._getHttpParams({
        isDraft,
      }),
      headers: this._createAuthHeader(authResponse),
    }).pipe(map(res => {
      return new PostModel(res);
    }));
  }

  /**
   * update existing post
   * @param post post model
   * @param authResponse auth response
   */
  updatePost(post: PostModel, authResponse: AuthResponse): Observable<PostModel> {
    return this.http.put<IPostModel>(this.endpoint(`/${post.id}`), post.toRequest(), {
      headers: this._createAuthHeader(authResponse),
    }).pipe(map(res => {
      return new PostModel(res);
    }));
  }

  /**
   * revert published post to draft
   * @param post post model
   * @param authResponse auth response
   */
  revertPost(post: PostModel, authResponse: AuthResponse): Observable<PostModel> {
    return this.http.post<IPostModel>(this.endpoint(`/${post.id}/revert`), undefined, {
      headers: this._createAuthHeader(authResponse),
    }).pipe(map(res => {
      return new PostModel(res);
    }));
  }

  /**
   * publish draft post
   * @param post post model
   * @param authResponse auth response
   */
  publishPost(post: PostModel, authResponse: AuthResponse): Observable<PostModel> {
    return this.http.post<IPostModel>(this.endpoint(`/${post.id}/publish`), undefined, {
      headers: this._createAuthHeader(authResponse),
    }).pipe(map(res => {
      return new PostModel(res);
    }));
  }

  /**
   * delete post
   * @param post post to delete
   * @param authResponse auth response
   */
  deletePost(post: PostModel, authResponse: AuthResponse): Observable<void> {
    return this.http.delete<void>(this.endpoint(`/${post.id}`), {
      headers: this._createAuthHeader(authResponse),
    });
  }
}
