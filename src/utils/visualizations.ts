type TODO = any;
let types: TODO = {};
function getType(name: string) {
  return types[name];
}
function registerTypes(visualizations: TODO) {
  types = visualizations;
}

export default {
  getType,
  getTypes: () => types,
  getRegisteredNames() {
    return Object.keys(types);
  },
  getLibraryInfo(type: TODO) {
    return types[type] ? types[type].getLibraryInfo() : null;
  },
  getIconName(type: TODO) {
    return types[type] ? types[type].getIconName() : null;
  },
  getIconChar(type: TODO) {
    return types[type] ? types[type].getIconChar() : null;
  },
  getIconPath(type: TODO) {
    return types[type] ? types[type].getIconPath() : null;
  },
  supportExport(type: TODO) {
    return types[type] ? types[type].supportExport() : false;
  },
  registerTypes,
};
