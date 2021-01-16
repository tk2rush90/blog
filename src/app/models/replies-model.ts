export interface IRepliesModel {
  totalItems: string;
  selfLink: string;
}

export class RepliesModel implements IRepliesModel {
  totalItems: string;
  selfLink: string;

  constructor(model?: IRepliesModel) {
    this.totalItems = model?.totalItems || '';
    this.selfLink = model?.selfLink || '';
  }

  /**
   * transform to replies request model
   */
  toRequest(): IRepliesModel {
    return {
      totalItems: this.totalItems,
      selfLink: this.selfLink,
    };
  }
}
