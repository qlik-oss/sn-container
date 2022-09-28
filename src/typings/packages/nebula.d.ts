declare module '@nebula.js/stardust';

/** Environment. (supernova parameter) */
declare interface EnvironmentType {
  translator: TranslatorType;
}

/** Translator. */
declare interface TranslatorType {
  get: Function;
  add: Function;
}

declare interface RectType {
  width: number;
  height: number;
}

declare interface Selections {
  isActive(): boolean;
  begin(path: string): void;
}
