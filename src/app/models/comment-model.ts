import {BaseModel} from '@scripter/models/base-model';
import {AuthorModel, IAuthorModel} from '@scripter/models/author-model';
import {IdModel, IIdModel} from '@scripter/models/id-model';

export interface ICommentModel {
  kind: string;
  status: string;
  id: string;
  inReplyTo?: IIdModel;
  post: IIdModel;
  blog: IIdModel;
  published: string;
  updated: string;
  selfLink: string;
  content: string;
  author: IAuthorModel;
}

export class CommentModel extends BaseModel implements ICommentModel {
  kind: string;
  status: string;
  id: string;
  inReplyTo?: IdModel;
  post: IdModel;
  blog: IdModel;
  published: string;
  updated: string;
  selfLink: string;
  content: string;
  author: AuthorModel;

  constructor(model: ICommentModel) {
    super();

    this.kind = model.kind || '';
    this.status = model.status || '';
    this.id = model.id || '';
    this.inReplyTo = this._createOptionalModel(model.inReplyTo, IdModel);
    this.post = new IdModel(model.post);
    this.blog = new IdModel(model.blog);
    this.published = model.published || '';
    this.updated = model.updated || '';
    this.selfLink = model.selfLink || '';
    this.content = model.content || '';
    this.author = new AuthorModel(model.author);
  }
}
