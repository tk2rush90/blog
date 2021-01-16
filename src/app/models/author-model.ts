import {IImageUrlModel, ImageUrlModel} from '@scripter/models/image-url-model';
import {BaseModel} from '@scripter/models/base-model';

export interface IAuthorModel {
  id: string;
  displayName: string;
  url: string;
  image: IImageUrlModel;
}

export class AuthorModel extends BaseModel implements IAuthorModel {
  id: string;
  displayName: string;
  url: string;
  image: ImageUrlModel;

  constructor(model?: IAuthorModel) {
    super();

    this.id = model?.id || '';
    this.displayName = model?.displayName || '';
    this.url = model?.url || '';
    this.image = new ImageUrlModel(model?.image);
  }

  /**
   * transform to author request model
   */
  toRequest(): IAuthorModel {
    return {
      id: this.id,
      displayName: this.displayName,
      url: this.url,
      image: this.image,
    };
  }
}
