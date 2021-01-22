import {AuthorModel, IAuthorModel} from '@scripter/models/author-model';
import {IdModel, IIdModel} from '@scripter/models/id-model';
import {IRepliesModel, RepliesModel} from '@scripter/models/replies-model';
import {BaseModel} from '@scripter/models/base-model';
import {environment} from '../../environments/environment';

const {
  categories,
} = environment;

export interface IPostModel {
  title: string;
  content: string;
  labels: string[];
  kind?: string;
  id?: string;
  blog?: IIdModel;
  published?: string;
  updated?: string;
  url?: string;
  selfLink?: string;
  author?: IAuthorModel;
  replies?: IRepliesModel;
  etag?: string;
  status?: string;
  readerComments?: string;
}

export class PostModel extends BaseModel implements IPostModel {
  title: string;
  content: string;
  labels: string[];
  kind: string | undefined;
  id: string | undefined;
  blog: IdModel | undefined;
  published: string | undefined;
  updated: string | undefined;
  url: string | undefined;
  selfLink: string | undefined;
  author: AuthorModel | undefined;
  replies: RepliesModel | undefined;
  etag: string | undefined;
  status: string | undefined;
  readerComments: string | undefined;
  // category label
  category!: string;

  constructor(model?: IPostModel) {
    super();

    this.title = model?.title || '';
    this.content = model?.content || '';
    this.labels = model?.labels || [];
    this.kind = model?.kind || undefined;
    this.id = model?.id || undefined;
    this.blog = model?.blog ? new IdModel(model?.blog) : undefined;
    this.published = model?.published || undefined;
    this.updated = model?.updated || undefined;
    this.url = model?.url || undefined;
    this.selfLink = model?.selfLink || undefined;
    this.author = model?.author ? new AuthorModel(model.author) : undefined;
    this.replies = model?.replies ? new RepliesModel(model?.replies) : undefined;
    this.etag = model?.etag || undefined;
    this.status = model?.status || undefined;
    this.readerComments = model?.readerComments || undefined;

    this._setCategoryLabel();
  }

  /**
   * set category label
   */
  private _setCategoryLabel(): void {
    const categoryLabels: string[] = [];

    this.labels = this.labels.filter(label => {
      const index = categories.findIndex(category => category.value === label);

      if (index !== -1) {
        categoryLabels.push(label);

        return false;
      } else {
        return true;
      }
    });

    // set first category label as category
    this.category = categoryLabels[0] || '';
  }

  /**
   * transform to request model
   */
  toRequest(): IPostModel {
    return {
      id: this.id,
      published: this.published ? undefined : new Date().toISOString(),
      updated: new Date().toISOString(),
      title: this.title,
      content: this.content,
      labels: [
        this.category,
        ...this.labels,
      ],
    };
  }
}
