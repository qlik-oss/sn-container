/** Check Nebula API doc for useApp() hook */
interface App {
  getOnTheFlyWithHiddenListObject(): Promise<GenericObject>;
  getDimensionListObject(): Promise<GenericObject>;
  getObject(id: string): Promise<GenericObject>;
  getMasterObjectList(): Promise<MasterObject[]>;
  properties: AppProperties;
  getUndoInfoObject(): Promise<UndoInfo>;
  enigmaModel: Model;
  getLayout(): Promise<any>;
}

interface AppProperties {
  published: boolean;
}

interface GenericObject {
  getLayout: Function;
  layout: Layout;
  enigmaModel: Model;
  id: string;
  app: App;
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

type MasterItem = {};

type MasterObject = {
  name: string;
  qExtendsId?: string;
  qData: { visualization: string; name: string };
  qInfo: { qId: string; qType: string };
  containerChildId: string;
};

// type MasterObject = {
//   name: string;
//   visualization: string;
//   icon: string | undefined;
//   visible?: boolean;
//   isLibraryItem?: boolean;
//   isThirdParty?: boolean;
//   qExtendsId?: string;
//   qData: { visualization: string; name: string; };
//   qInfo: { qId?: string;  qType: string; };
//   containerChildId: string;
// };

interface Undoinfo {
  startGroup(): Promise<string>;
  endGroup(): Primise<null>;
}
