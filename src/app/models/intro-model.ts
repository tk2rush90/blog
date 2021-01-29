export interface IIntroModel {
  name: string;
  thumbnail: string;
  route: string[];
}

export class IntroModel implements IIntroModel {
  name: string;
  thumbnail: string;
  route: string[];

  constructor(data?: IIntroModel) {
    this.name = data?.name || '';
    this.thumbnail = data?.thumbnail || '';
    this.route = data?.route || [];
  }
}
