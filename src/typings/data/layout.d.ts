declare interface LayoutService {
  getDataPages(): NxDataPage[];
  getLayoutValue(path: string): any;
  getLayout(): Layout;
}

declare interface QChildList {
  qItems: any[];
}

declare interface Layout extends BasicProperties {
  snapshotData?: any;
  children?: any;
  qChildList?: QChildList;
}
