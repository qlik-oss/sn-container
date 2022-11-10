const translatorMock: TranslatorType = {
  get: jest.fn().mockImplementation((inputString: string) => inputString),
  add: jest.fn().mockImplementation((_inputString: string) => undefined),
  language: 'eng',
};

export default translatorMock;
