import {BaseModel} from '@scripter/models/base-model';
import {CommentModel, ICommentModel} from '@scripter/models/comment-model';

export interface ICommentListResponseModel {
  kind: string;
  nextPageToken: string;
  prevPageToken: string;
  items: ICommentModel[];
}

export class CommentListResponseModel extends BaseModel implements ICommentListResponseModel {
  kind: string;
  nextPageToken: string;
  prevPageToken: string;
  items: CommentModel[];

  constructor(model: ICommentListResponseModel) {
    super();

    this.kind = model.kind || '';
    this.nextPageToken = model.nextPageToken || '';
    this.prevPageToken = model.prevPageToken || '';
    this.items = this._createArrayModels(model.items, CommentModel);
  }
}
