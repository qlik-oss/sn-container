declare interface ContainerProperties extends BasicProperties {
  showTabs: boolean;
  defaultTab: boolean;
}

declare interface PropertyHandler {
  layout: Layout;
}

declare interface DropdownOption {
  label?: string;
  translation?: string;
  value: string;
}
