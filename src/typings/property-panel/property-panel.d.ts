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

declare interface PropertyPatch {
  qPath: string;
  qOp: string;
  qValue: string;
}

declare interface PropertyModel {
  createChild(childProps: MasterObject): Promise<{ id: string }>;
  getProperties(): Promise<ContainerProperties>;
  id(id: any, childProps: MasterObject, id1: any): unknown;
  layout: Layout;
  properties: ContainerProperties;
  handler: PropertyHandler;
  setProperties(properties: ContainerProperties): Promise<ContainerProperties>;
  destroyChild(childId: string): Promise<void>;
  items?: any;
  showPP: boolean;
  app: App;
  applyPatches(patches: PropertyPatch[], arg2: boolean): Promise<void>;
}
