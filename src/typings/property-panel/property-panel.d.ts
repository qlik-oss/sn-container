declare interface Option {
  value: string;
  label: string;
}

declare interface ImageOption extends Option {
  src: string;
}

declare interface OptionsListParameters {
  rootPath: string;
}

declare interface PropertyArgs {
  layout: Layout;
  properties: ContainerProperties;
  handler: PropertyHandler;
  model: PropertyModel;
}

declare interface PropertyModel {
  layout: Layout;
  properties: ContainerProperties;
  handler: PropertyHandler;
  setProperties(properties: ContainerProperties): Promise<ContainerProperties>;
  destroyChild(childId: string): Promise<void>;
  items?: any;
  showPP: boolean;
  app: App;
}
