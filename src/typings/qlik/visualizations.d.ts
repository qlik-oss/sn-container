type ToDo = any;

declare interface Visualizations {
  getType(type: string): ToDo;
  getRegisteredNames(): ToDo;
  getLibraryInfo(type: string): ToDo;
  getIconName(type: string): string;
  registerTypes(type: string): ToDo;
}
