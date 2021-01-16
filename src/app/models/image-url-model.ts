import {BaseModel} from '@scripter/models/base-model';

export interface IImageUrlModel {
  url: string;
}

export class ImageUrlModel extends BaseModel implements IImageUrlModel {
  url: string;

  constructor(model?: IImageUrlModel) {
    super();

    this.url = model?.url || '';
  }
}
