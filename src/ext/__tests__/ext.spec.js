import extFn from '../ext';

describe('data-definition', () => {
  const env = {
    translator: {
      get: (translationProperty) => translationProperty,
    },
  };
  const ext = extFn(env);

  it('should have correct properties', () => {
    expect(ext).to.have.all.keys(['definition', 'support']);
  });

  it('should contain correct data', () => {
    const { content } = ext.definition.items;
    expect(content.uses).to.equal('data');
  });

  it('should contain correct settings', () => {
    const { settings } = ext.definition.items;
    expect(settings.uses).to.equal('settings');
  });
});
