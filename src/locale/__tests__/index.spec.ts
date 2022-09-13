import autoRegister from '..';
import env from '../../mocks/environment';

describe('locale', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add translations when they do not exist', () => {
    autoRegister(env.translator);
    expect(env.translator.add).not.toHaveBeenCalled(); // Update when we add translations
  });
  it('should not add translations when they already exist', () => {
    env.translator.get = (translation: string) => `_${translation}`;
    autoRegister(env.translator);
    expect(env.translator.add).toHaveBeenCalledTimes(0);
  });
});
