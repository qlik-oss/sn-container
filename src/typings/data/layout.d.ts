declare interface LayoutService {
  getDataPages(): NxDataPage[];
  getLayout(): Layout;
}

declare interface LayoutChild {
  refId: string;
  label: string;
  isMaster: boolean;
  cId?: string;
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

declare interface Layout extends BasicProperties {
  snapshotData?: any;
  children?: LayoutChild[];
  qChildList?: QChildList;
}
