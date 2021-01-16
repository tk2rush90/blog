export class BaseModel {
  /**
   * create array model instances
   * @param models models to create instances
   * @param constructor constructor of instance
   */
  protected _createArrayModels<C, I>(models: I[], constructor: new (model: I) => C): C[] {
    return (models || []).map(model => new constructor(model));
  }

  /**
   * create optional model instance
   * @param model model to create instance
   * @param constructor constructor of instance
   */
  protected _createOptionalModel<C, I>(model: I | undefined, constructor: new (model: I) => C): C | undefined {
    return model ? new constructor(model) : undefined;
  }
}
