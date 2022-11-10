let masterObjectList: MasterObject[] = [];

export default {
  getMasterObjectList() {
    return masterObjectList;
  },
  loadMasterObjectList(masterObjects: MasterObject[]) {
    masterObjectList = masterObjects;
  },
};
