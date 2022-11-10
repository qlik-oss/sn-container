import extFn from '../ext';
import envMock from '../../mocks/environment';

describe('data-definition', () => {
  const ext = extFn(envMock);

  it('should have correct properties', () => {
    expect(ext).toHaveProperty('definition');
    expect(ext).toHaveProperty('support');
  });

  it('should contain correct data', () => {
    const { data } = ext.definition.items;
    expect(data.uses).toEqual('data');
  });

  it('should contain correct settings', () => {
    const { settings } = ext.definition.items;
    expect(settings.uses).toEqual('settings');
  });
});
