import dataDefinition from '../data-definition';

describe('qae index', () => {
  it('should return proper structure of qae', () => {
    const definition = dataDefinition();
    const target = definition.targets[0];
    expect(target).toHaveProperty('dimensions');
    expect(target.dimensions.max).toEqual(0);
    expect(target).toHaveProperty('measures');
    expect(target.measures.max).toEqual(0);
  });
});
