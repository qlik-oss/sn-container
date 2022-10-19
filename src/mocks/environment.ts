const translator: TranslatorType = {
  get: jest.fn().mockImplementation((translation: string) => translation),
  add: jest.fn(),
};
const env: EnvironmentType = { translator, sense: {} };
export default env;
