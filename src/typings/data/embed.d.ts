declare interface Embed {
  render({ id: string, element: any, options: any, model: any, style: any }): any;
}

declare interface EmbedOptions {
  direction?: Direction;
  isReadonly: boolean;
  isPopover: boolean;
  navigation: boolean;
  selections: boolean;
}

declare interface EmbedStyle {
  height: string;
  width: string;
  border: string;
}
