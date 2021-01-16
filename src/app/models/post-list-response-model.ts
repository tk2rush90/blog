import {IPostModel, PostModel} from '@scripter/models/post-model';
import {BaseModel} from '@scripter/models/base-model';

export interface IPostListResponseModel {
  kind: string;
  items: IPostModel[];
  etag: string;
  nextPageToken?: string;
}

export class PostListResponseModel extends BaseModel implements IPostListResponseModel {
  kind: string;
  items: PostModel[];
  etag: string;
  nextPageToken: string;

  constructor(model: IPostListResponseModel) {
    super();

    this.kind = model.kind || '';
    this.items = this._createArrayModels(model.items, PostModel);
    this.etag = model.etag || '';
    this.nextPageToken = model.nextPageToken || '';
  }
}
