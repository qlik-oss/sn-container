const translatorMock: TranslatorType = {
  get: (inputString: string) => inputString,
  add: (inputString: string) => inputString,
  language: 'eng',
};

export default translatorMock;
