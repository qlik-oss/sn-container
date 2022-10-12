/** Check Nebula API doc for useApp() hook */
interface App {
  getOnTheFlyWithHiddenListObject(): Promise<GenericObject>;
  getDimensionListObject(): Promise<GenericObject>;
  getObject(id: string): Promise<GenericObject>;
  getMasterObjectList(): Promise<MasterObject[]>;
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

type MasterObject = {
  name: string;
  visualization: string;
  icon: string | undefined;
  visible?: boolean;
  isLibraryItem?: boolean;
  isThirdParty?: boolean;
  qExtendsId?: string;
};
