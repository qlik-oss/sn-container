import { useCore, useRender } from '../';

describe('hooks index', () => {
  it('should return the hooks', () => {
    expect(useCore).toBeDefined();
    expect(useRender).toBeDefined();
  });
});
