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
  getExtensionType(): ExtensionType;
  getInitialProperties(): BasicProperties;
  load(): Promise<void>;
  getIconName(): string;
}

declare interface Visualizations {
  getType(type: string): Visualization;
  getRegisteredNames(): string[];
}

declare interface StageState {
  propertiesOpen: boolean;
  setSelectedObject(obj: any): void;
}

declare interface VisualizationApi {
  editMaster(id: string, type: string): void;
  visualizations: Visualizations;
  stageState: StageState;
}
