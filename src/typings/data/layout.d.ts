declare interface LayoutService {
  getDataPages(): NxDataPage[];
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
