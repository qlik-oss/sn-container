declare interface PropertiesChild {
  refId: string;
  label: string;
  isMaster: boolean;
  cId?: string;
}

declare interface ContainerProperties extends BasicProperties {
  borders?: string;
  showTabs?: boolean;
  useDropdown?: boolean;
  useScrollButton?: boolean;
  label: string;
  children: PropertiesChild[];
  defaultTab: string;
}

declare interface PropertyHandler {
  layout: Layout;
}

declare interface DropdownOption {
  label?: string;
  translation?: string;
  value: string;
}
