import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BOTH, ViewToggleType} from '@scripter/components/common/view-toggle-icon/view-toggle-icon.component';
import {PostModel} from '@scripter/models/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostEditorService {
  // view toggle subject
  private _view$: BehaviorSubject<ViewToggleType> = new BehaviorSubject<ViewToggleType>(BOTH);
  // post data subject
  private _post$: BehaviorSubject<PostModel> = new BehaviorSubject(new PostModel());

  constructor() { }

  /**
   * set view toggle type
   * @param view view
   */
  set view(view: ViewToggleType) {
    this._view$.next(view);
  }

  /**
   * return view as observable
   */
  get view$(): Observable<ViewToggleType> {
    return this._view$.asObservable();
  }

  /**
   * set post model data
   * @param post post model
   */
  set post(post: PostModel) {
    this._post$.next(post);
  }

  /**
   * return post model as observable
   */
  get post$(): Observable<PostModel> {
    return this._post$.asObservable();
  }

  /**
   * reset the service
   */
  reset(): void {
    this._post$.next(new PostModel());
    this._view$.next(BOTH);
  }
}
