/** Check Nebula API doc for useApp() hook */
interface App {
  getOnTheFlyWithHiddenListObject(): Promise<GenericObject>;
  getDimensionListObject(): Promise<GenericObject>;
  getObject(id: string): Promise<GenericObject>;
  getMasterObjectList(): Promise<BasicProperties[]>;
  properties: AppProperties;
}

interface AppProperties {
  published: boolean;
}

interface GenericObject {
  getLayout: Function;
}

interface Field {
  qTags: string[];
  qSrcTables: string[];
  qName: string;
}

interface LibraryDimension {
  qData: {
    info: [{ qName: string }];
  };
  qInfo: {
    qId: string;
  };
}
