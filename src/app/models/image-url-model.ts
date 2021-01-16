import {BaseModel} from '@scripter/models/base-model';

export interface IImageUrlModel {
  url: string;
}

export class ImageUrlModel extends BaseModel implements IImageUrlModel {
  url: string;

  constructor(model?: IImageUrlModel) {
    super();

    this.url = model?.url || '';

    this._replaceTheURL();
  }

  /**
   * replace the default url
   * if the url contains blogger's default url, then replace it to
   * scripter log's default url
   */
  private _replaceTheURL(): void {
    if ((this.url || '').indexOf('blogger_logo_round_35') !== -1) {
      this.url = '/assets/images/default-user-image.png';
    }
  }
}
