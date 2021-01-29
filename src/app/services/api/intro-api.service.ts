import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiBaseService} from '@scripter/services/api/api-base.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {IIntroModel, IntroModel} from '@scripter/models/intro-model';
import {Observable} from 'rxjs';

const {
  localAssets,
} = environment;

@Injectable({
  providedIn: 'root'
})
export class IntroApiService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/intro', localAssets);
  }

  /**
   * get intro list from local assets
   */
  getIntroList(): Observable<IntroModel[]> {
    return this.http.get<IIntroModel[]>(this.endpoint('/intro-list.json'))
      .pipe(map(res => {
        return res.map(item => new IntroModel(item));
      }));
  }
}
