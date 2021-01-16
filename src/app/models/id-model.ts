import {BaseModel} from '@scripter/models/base-model';

export interface IIdModel {
  id: string;
}

export class IdModel extends BaseModel implements IIdModel {
  id: string;

  constructor(model?: IIdModel) {
    super();

    this.id = model?.id || '';
  }

  /**
   * transform to id request model
   */
  toRequest(): IIdModel {
    return {
      id: this.id,
    };
  }
}
