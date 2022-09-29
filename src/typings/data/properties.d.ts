declare interface ContainerProperties extends BasicProperties {
  borders?: string;
  showTabs?: boolean;
  useDropdown?: boolean;
  useScrollButton?: boolean;
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
