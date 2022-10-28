declare interface LibraryInfo {
  translationKey: string;
  name: string;
  icon: string;
  visible: boolean;
  isLibraryItem: boolean;
  isThirdParty: boolean;
}

declare interface ExtensionType {
  mapProperties(): void;
  getCreatePropertyHandler: { call(extension: ExtensionType, model: Model): any };
  model: Model;
  definition: any;
}

declare interface Visualization {
  getLibraryInfo(): LibraryInfo;
  getExtensionType(): Promise<ExtensionType>;
  getInitialProperties(): Promise<BasicProperties>;
  load(): Promise<void>;
  getIconName(): string;
}

declare interface Visualizations {
  getType(type: string): Visualization;
  getRegisteredNames(): string[];
}

declare interface VisualizationApi {
  editMaster(id: string, type: string): void;
  visualizations: Visualizations;
  changePropertyPanel(model: Model, object: GenericObject): Promise<void>;
}
