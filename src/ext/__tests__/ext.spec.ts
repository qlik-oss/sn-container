import extFn from '../ext';

describe('data-definition', () => {
  const env = {
    translator: {
      get: (translationProperty: any) => translationProperty,
    },
  };
  const ext = extFn(env);

  it('should have correct properties', () => {
    expect(ext).toHaveProperty('definition');
    expect(ext).toHaveProperty('support');
  });

  it('should contain correct data', () => {
    const { content } = ext.definition.items;
    expect(content.uses).toEqual('data');
  });

  it('should contain correct settings', () => {
    const { settings } = ext.definition.items;
    expect(settings.uses).toEqual('settings');
  });
});
