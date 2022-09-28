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

declare interface Embed {
  render({ id: string, element: HTMLElement, options: EmbedOptions, model: GenericObject, style: EmbedStyle }): any;
}
