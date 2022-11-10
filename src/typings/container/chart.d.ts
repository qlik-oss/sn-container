declare interface MergedLayoutChild extends PropertiesChild, QChild {
  visible?: boolean;
}

// This is the combination of Master Items and Lib
declare interface ChartOfAnyType {
  name: string;
  visualization: string;
  qExtendsId?: string;
  visible?: boolean;
  isLibraryItem?: boolean;
  isThirdParty?: boolean;
}
