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
  model: Model;
}

declare interface PropertyPatch {
  qPath: string;
  qOp: string;
  qValue: string;
}

declare interface Model {
  createChild(childProps: MasterObject): Promise<{ id: string }>;
  getProperties(): Promise<ContainerProperties>;
  getLayout(): Promise<Layout>;
  id(id: string, childProps: MasterObject, id1: string): unknown;
  layout: Layout;
  properties: ContainerProperties;
  handler: PropertyHandler;
  setProperties(properties: ContainerProperties): Promise<ContainerProperties>;
  destroyChild(childId: string): Promise<void>;
  items?: any;
  showPP: boolean;
  app: App;
  applyPatches(patches: PropertyPatch[], isSoftPatch: boolean): Promise<void>;
  enigmaModel?: Model;
}
