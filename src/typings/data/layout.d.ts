declare interface LayoutService {
  getDataPages(): NxDataPage[];
  getLayoutValue(path: string): any;
  getLayout(): Layout;
}

declare interface Layout extends BasicProperties {
  snapshotData?: any;
}
