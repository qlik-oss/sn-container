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
  getCreatePropertyHandler: { call(extension: ExtensionType, app: App): any };
}

declare interface Visualization {
  getLibraryInfo(): LibraryInfo;
  getExtensionType(): ExtensionType;
  getInitialProperties(): BasicProperties;
}

declare interface Visualizations {
  getType(type: string): Visualization;
  getRegisteredNames(): string[];
  getIconName(type: string): string;
  registerTypes(type: string): string[];
}
