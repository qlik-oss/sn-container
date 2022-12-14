declare interface LayoutService {
  getDataPages(): NxDataPage[];
  getLayout(): Layout;
}

declare interface QInfo {
  qId: string;
  qType: string;
}

declare interface QMeta {
  priveleges: string[];
}

declare interface QData {
  title: string;
  visualization: string;
  containerChildId: string;
  qExtendsId: string;
  showCondition: string;
}

declare interface QChild {
  qInfo: QInfo;
  qMeta: QMeta;
  qData: QData;
}

declare interface QChildList {
  qItems: QChild[];
}

declare interface LayoutChild extends PropertiesChild {
  condition?: string;
}

declare interface Layout extends ContainerProperties {
  qExtendsId?: string;
  snapshotData?: any;
  qChildList: QChildList;
  children: LayoutChild[];
  visualization: string;
}
